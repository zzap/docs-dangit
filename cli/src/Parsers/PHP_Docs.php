<?php
/**
 * PHP Docs Parser
 *
 * @package Docsdangit
 */
namespace Docsdangit\Parsers;

use Docsdangit\Interfaces\Parser;
use Docsdangit\Data\Snippet;
use Docsdangit\Data\API_Writer;
use Symfony\Component\HttpClient\HttpClient;

class PHP_Docs implements Parser {
    private $gh_token;

    public function __construct() {
        $config = parse_ini_file('config/config.ini');
        $this->gh_token = $config['gh_token'];
    }

    public function reset() {}

    public function parse() {
        $reference_url = 'https://api.github.com/repos/php/doc-en/git/trees/7ce1ebaf86b8360697acebb3e548d364c0c222bc';
        $client = HttpClient::create();
        $response = $client->request('GET', $reference_url, [
            'auth_bearer' => $this->gh_token
        ]);
        $content = $response->getContent();
        $dirs = json_decode( $content );
        foreach( $dirs->tree as $dir ) {
            if( 'tree' === $dir->type ) {
                echo $dir->path . "\n";
                $this->parse_namespace( $dir->url, $dir->path );
            }
        }
    }

    public function parse_namespace( $url, $namespace ) {
        $client = HttpClient::create();
        $response = $client->request('GET', $url, [
            'auth_bearer' => $this->gh_token
        ]);
        $content = $response->getContent();
        $dirs = json_decode( $content );
        foreach( $dirs->tree as $dir ) {
            if( 'functions' === $dir->path ) {
                echo '\-- functions' . "\n";
                $this->parse_functions( $dir->url, $namespace );
                break;
            }
        }
    }

    public function parse_functions( $url, $namespace ) {
        $client = HttpClient::create();
        $response = $client->request('GET', $url, [
            'auth_bearer' => $this->gh_token
        ]);
        $content = $response->getContent();
        $dirs = json_decode( $content );
        foreach( $dirs->tree as $dir ) {
            if( 'blob' === $dir->type ) {
                echo $dir->path . "\n";
                $snippet = $this->parse_snippet( $dir->path, $namespace );
                if( count( $snippet->get_snippets() ) > 0 ) {
                    $writer = new API_Writer( $snippet );
                    $writer->write();
                }
            }
        }
    }

    public function parse_snippet( $path, $namespace ) : Snippet {
        // parse snippet
        $xml_url = "https://raw.githubusercontent.com/php/doc-en/master/reference/{$namespace}/functions/{$path}";
        $fn_name = str_replace( '.xml', '', $path );
        $url = "https://www.php.net/manual/en/function.{$fn_name}.php";
        $raw = file_get_contents( $xml_url );
        $pattern = '/<\?php(.*?)\?>/si';
        preg_match_all( $pattern, $raw, $matches );
        $id = hash( 'sha256', $url );
        $code_snippets = [];
        if( count( $matches ) > 0 ) {
            foreach( $matches[1] as $match ) {
                $code_snippets[] = [
                    'language' => 'php',
                    'code' => $match
                ];
            }
        }

        // get command tags
        $command_tags = [];

        $now = date( 'Y-m-d H:i:s' );
        $snippet_data = [
            'id' => $id,
            'title' => $fn_name,
            'snippets' => $code_snippets,
            'context' => '',
            'source' => 'php_reference',
            'tags' => ['php'],
            'command_tags' => $command_tags,
            'code_language_tags' => ['php'],
            'language' => 'en-US',
            'version' => '',
            'url' => $url,
            'creator' => '',
            'parse_date' => $now,
            'code_creation_date' => '',
            'updated' => $now
        ];

        $snippet = new Snippet( ...$snippet_data );
        return $snippet;
    }
}
