<?php
/**
 * WP_CLI parser
 *
 * @package Docsdangit
 */
namespace Docsdangit\Parsers;

use Docsdangit\Interfaces\Parser;
use Docsdangit\Data\Snippet;
use Docsdangit\Data\Plaintext;
use Docsdangit\Data\API_Writer;

class WP_CLI implements Parser {
    private $wp_cli_version;

    public function __construct() {
        $this->wp_cli_version = $this->get_source_version();
    }

    public function parse() {
        $file = 'data/wpcli-commands.json';
        $raw = file_get_contents( $file );
        $json = json_decode( $raw );
        $this->process_subcommands( $json->subcommands, 'https://developer.wordpress.org/cli/commands/', [] );
    }

    public function get_source_version() {
        $file = 'data/wpcli-version.txt';
        $raw = file_get_contents( $file );
        return str_replace("WP-CLI ", "", $raw);
    }

    public function reset() {}

    private function process_subcommands( $json, $path, $commands ) {
        foreach( $json as $item ) {
            $item_path = $path . $item->name . '/';
            $new_commands = $commands;
            $new_commands[] = $item->name;
            $snippet = $this->parse_snippet( $item, $item_path, $new_commands );

            if( count( $snippet->get_snippets() ) > 0 ) {
                $writer = new API_Writer( $snippet );
                $writer->write();
            }

            // subcommands
            if( isset( $item->subcommands ) ) {
                $this->process_subcommands( $item->subcommands, $item_path, $new_commands );
            }
        }
    }

    private function parse_snippet( $item, $path, $commands ) {
        // parse code snippet
        $id = hash( 'sha256', $path );
        $long_desc = $item->longdesc;
        $pattern = "/## EXAMPLES(.*?)##/s";
        preg_match( $pattern, $long_desc, $matches );
        $code_snippets = [];
        if( count( $matches ) > 1 ) {
            $code_snippets[] = [
                'language' => 'bash',
                'code' => $matches[1]
            ];
        }

        $title = 'wp ' . implode(' ', $commands );

        $now = date( 'Y-m-d H:i:s' );
        $snippet_data = [
            'id' => $id,
            'title' => $title,
            'snippets' => $code_snippets,
            'context' => '',
            'source' => 'wpcli',
            'tags' => ['WordPress'],
            'command_tags' => $commands,
            'code_language_tags' => ['bash'],
            'language' => 'en-US',
            'version' => $this->wp_cli_version,
            'url' => $path,
            'creator' => '',
            'parse_date' => $now,
            'code_creation_date' => '',
            'updated' => $now
        ];
        $snippet = new Snippet( ...$snippet_data );
        return $snippet;
    }
}
