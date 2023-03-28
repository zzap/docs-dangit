<?php

use Docsdangit\Data\Snippet;

require dirname(__FILE__) . '/Docs_Dangit_Test.php';
require dirname( dirname(__FILE__) ) . '/src/Data/Snippet.php';

class Snippet_Test extends Docs_Dangit_Test {
    public function test_snippet() {
        $snippet = new Snippet(
            'id',
            array(
                array( 
                    'language' => 'php',
                    'code' => 'echo "Hello World!";',
                )
            ),
            'context',
            'source',
            array( 'tag1', 'tag2', 'tag3' ),
            array( 'command1', 'command2', 'command3' ),
            array( 'php', 'js', 'css' ),
            'language',
            'version',
            'url',
            'creator',
            'parse_date',
            'code_creation_date',
            'updated'
        );

        $this->assertEquals( 'id', $snippet->get_id() );
        $this->assertEquals( 'php', $snippet->get_snippets()[0]['language'] );
        $this->assertEquals( 'echo "Hello World!";', $snippet->get_snippets()[0]['code'] );
        $this->assertEquals( 'context', $snippet->get_context() );
        $this->assertEquals( 'source', $snippet->get_source() );
        $this->assertEquals( array( 'tag1', 'tag2', 'tag3' ), $snippet->get_tags() );
        $this->assertEquals( array( 'command1', 'command2', 'command3' ), $snippet->get_command_tags() );
        $this->assertEquals( array( 'php', 'js', 'css' ), $snippet->get_code_language_tags() );
        $this->assertEquals( 'language', $snippet->get_language() );
        $this->assertEquals( 'version', $snippet->get_version() );
        $this->assertEquals( 'url', $snippet->get_url() );
        $this->assertEquals( 'creator', $snippet->get_creator() );
        $this->assertEquals( 'parse_date', $snippet->get_parse_date() );
        $this->assertEquals( 'code_creation_date', $snippet->get_code_creation_date() );
        $this->assertEquals( 'updated', $snippet->get_updated() );
    }
}