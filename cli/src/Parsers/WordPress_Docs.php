<?php
/**
 * WP Docs Parser
 *
 * @package Docsdangit
 */
namespace Docsdangit\Parsers;

use Docsdangit\Interfaces\Parser;
use Docsdangit\Data\Snippet;
use Docsdangit\Data\Plaintext;
use Docsdangit\Data\API_Writer;

class WordPress_Docs implements Parser {
    private $wp_version;

    public function __construct() {
        $this->wp_version = $this->get_source_version();
    }

    public function reset() {}

    public function parse() {
        $url = 'https://developer.wordpress.org/wp-json/wp/v2/comments?per_page=100&page=';
        $headers = get_headers( $url . '1', true );
        $total_pages = $headers['X-WP-TotalPages'] ?? 41;
        for( $i = 1; $i <= $total_pages; $i += 1 ) {
            $raw = file_get_contents( $url . $i  );
            $json = json_decode( $raw, false );
            foreach( $json as $index => $item ) {
                $snippet = $this->parse_snippet( $item );

                if( count( $snippet->get_snippets() ) > 0 ) {
                    $writer = new API_Writer( $snippet );
                    $writer->write();
                }
            }
        }
    }

    public function get_source_version() {
        $url = 'https://api.wordpress.org/core/version-check/1.7/';
        $raw = file_get_contents( $url );
        $json = json_decode( $raw );
        // There's also $json->offers[0]->version.
        if ( is_object( $json ) && isset( $json->offers[0] ) ) {
            return $json->offers[0]->current;
        } else {
            return null;
        }
    }

    public function parse_snippet( $item ) : Snippet {
        // parse snippet
        $id = hash( 'sha256', $item->link );
        $pattern = '/<code[^>]*lang="([^"]*)"[^>]*>(.*?)<\/code>/s';
        preg_match_all( $pattern, $item->content->rendered, $matches );
        $code_snippets = [];
        $language_tags = [];
        if( count( $matches ) > 1 ) {
            foreach( $matches[1] as $index => $match ) {
                $code_snippets[] = [
                    'language' => $match,
                    'code' => $matches[2][$index]
                ];
                $language_tags[] = $match;
            }
        }

        // get command tags
        $command_tags = [];
        include 'data/wp-functions.php';
        foreach( $wp_functions as $fn ) {
            if( str_contains( $item->content->rendered, $fn ) ) {
                $command_tags[] = $fn;
            }
        }

        // get title
        $url_parts = explode( '/', $item->link );
        $title = $url_parts[ count( $url_parts ) - 2 ];

        $now = date( 'Y-m-d H:i:s' );
        $snippet_data = [
            'id' => $id,
            'title' => $title,
            'snippets' => $code_snippets,
            'context' => $item->content->rendered,
            'source' => 'wordpress_reference',
            'tags' => ['WordPress'],
            'command_tags' => $command_tags,
            'code_language_tags' => ['php'],
            'language' => 'en-US',
            'version' => $this->wp_version,
            'url' => $item->link,
            'creator' => $item->author_name,
            'parse_date' => $now,
            'code_creation_date' => $item->date,
            'updated' => $now
        ];

        $snippet = new Snippet( ...$snippet_data );
        return $snippet;
    }
}
