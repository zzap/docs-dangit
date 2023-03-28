<?php
/**
 * API writer
 */

namespace Docsdangit\Data;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Docsdangit\Interfaces\Writer;

class API_Writer implements Writer {
    const API_URL = 'https://heigl.docs-dang.it/api/docs';

    protected Snippet $snippet;
    protected HttpClientInterface $client;

    /**
     * API Writer constructor.
     *
     * @param Snippet $snippet
     */
    public function __construct( Snippet $snippet ) {
        $this->snippet = $snippet;
        $this->client = HttpClient::create();
    }

    /**
     * Write the snippet to the api;
     */
    public function write() {
        $snippets = array();
        foreach( $this->snippet->get_snippets() as $snippet ) {
            $snippets[] = array(
                'code' => html_entity_decode( string: $snippet['code' ], encoding: 'UTF-8' ),
                'language' => $snippet['language']
            );
        }

        $item = array(
            'title' => $this->snippet->get_title(),
            'code_snippet' => $snippets,
            'tags' => $this->snippet->get_tags(),
            'command_tags' => $this->snippet->get_command_tags(),
            'parse_date' => $this->snippet->get_parse_date(),
            'url' => $this->snippet->get_url(),
            'code_creator' => $this->snippet->get_creator(),
            'code_creation_datetime' => $this->snippet->get_code_creation_date(),
            'source' => $this->snippet->get_source(),
            'version' => $this->snippet->get_version(),
            'language' => $this->snippet->get_language(),
        );

        $url = $this->snippet->get_url();

        $item = json_encode( $item );

        $response = $this->client->request(
            'POST',
            self::API_URL,
            array(
                'verify_peer' => false,
                'verify_host' => false,
                'headers' => [
                    'Content-Type' => 'text/json',
                ],
                'body' => $item,
            )
        );

        echo 'Added ' . $url . ' with ' . count( $this->snippet->get_snippets() ) . ' (status code ' . $response->getStatusCode() . ')' . PHP_EOL;
    }
}
