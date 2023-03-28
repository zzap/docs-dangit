<?php
/**
 * Plaintext writer
 * 
 * @package Docsdangit
 */
namespace Docsdangit\Data;

use Docsdangit\Interfaces\Writer;

class Plaintext_Writer implements Writer {
    protected Snippet $snippet;

    protected string $filename;

    /**
     * Plaintext constructor.
     * 
     * @param Snippet $snippet
     * @param string $filename
     */
    public function __construct( Snippet $snippet, string $filename ) {
        $this->snippet = $snippet;
        $this->filename = $filename;
    }

    /**
     * Write the snippet to a file.
     */
    public function write() {
        $file = fopen( $this->filename, 'w');
        fwrite( $file, print_r( $this->snippet->get_all(), true ) );
        fclose( $file );
    }
}