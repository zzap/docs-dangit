<?php

use Docsdangit\Data\Snippet;
use Docsdangit\Parsers\WordPress_Docs;

require dirname(__FILE__) . '/Docs_Dangit_Test.php';
require dirname( dirname(__FILE__) ) . '/src/Data/Snippet.php';
require dirname( dirname(__FILE__) ) . '/src/Interfaces/Parser.php';
require dirname( dirname(__FILE__) ) . '/src/Parsers/WordPress_Docs.php';

class WordPress_Docs_Test extends Docs_Dangit_Test {
    public function test_parser() {
        $parser = new WordPress_Docs();

        // Item as object
        $item = new stdClass;
        $item->id = 6361;
        $item->post = 1384;
        $item->parent = 0;
        $item->author = 13253363;
        $item->author_name = 'tradesouthwest';
        $item->author_url = '';
        $item->date = '2023-02-22T17:46:29';
        $item->date_gmt = '2023-02-22T17:46:29';
        $item->content = new stdClass;
        $item->content->rendered = '<p>If you are working with custom post types or you are just not sure if the file you are working in has any direct access to the post, you can try this handy statement to get the ID of a post; outside of the loop even.</p>\n<pre class="wp-block-code"><code lang="php" class="language-php ">global $post;  \r\n    $post_id = ( empty( $post->ID ) ) ? get_the_ID() : $post->ID;</code></pre>\n<p>Then use $post_id string to assure you have the post ID. Example usage:</p>\n<pre class="wp-block-code"><code lang="php" class="language-php ">if ( get_post_type( $post_id ) != \'wpbdp_listing\' ) return;</code></pre>\n';
        $item->link = 'https://developer.wordpress.org/reference/functions/get_the_id/#comment-6361';
        $item->status = 'approved';
        $item->type = 'comment';
        $item->author_avatar_urls = array(
            '24' => 'https://secure.gravatar.com/avatar/73447974bbce11c37a245aac45e0cb3b?s=24&d=mm&r=g',
            '48' => 'https://secure.gravatar.com/avatar/73447974bbce11c37a245aac45e0cb3b?s=48&d=mm&r=g',
            '96' => 'https://secure.gravatar.com/avatar/73447974bbce11c37a245aac45e0cb3b?s=96&d=mm&r=g'
        );
        $item->meta = array();
        $item->_links = array(
            'self' => array(
                array(
                    'href' => 'https://developer.wordpress.org/wp-json/wp/v2/comments/6361'
                )
            ),
            'collection' => array(
                array(
                    'href' => 'https://developer.wordpress.org/wp-json/wp/v2/comments'
                )
            ),
            'author' => array(
                array(
                    'embeddable' => true,
                    'href' => 'https://developer.wordpress.org/wp-json/wp/v2/users/13253363'
                )
            ),
            'up' => array(
                array(
                    'embeddable' => true,
                    'post_type' => 'wp-parser-function',
                    'href' => 'https://developer.wordpress.org/wp-json/wp/v2/wp-parser-function/1384'
                )
            )
        );

        $snippet = $parser->parse_snippet( $item );
        $this->assertInstanceOf( Snippet::class, $snippet );

        $now = date( 'Y-m-d H:i:s' );

        $this->assertEquals( 'bcd0083e747c5cbf955af85fb339232247416a2c9d1dd952e28a2814f7455bec', $snippet->get_id() );
        $this->assertEquals( 'php', $snippet->get_snippets()[0]['language'] );
        $this->assertEquals( 'global $post;  \r\n    $post_id = ( empty( $post->ID ) ) ? get_the_ID() : $post->ID;', $snippet->get_snippets()[0]['code'] );
        $this->assertEquals( '<p>If you are working with custom post types or you are just not sure if the file you are working in has any direct access to the post, you can try this handy statement to get the ID of a post; outside of the loop even.</p>\n<pre class="wp-block-code"><code lang="php" class="language-php ">global $post;  \r\n    $post_id = ( empty( $post->ID ) ) ? get_the_ID() : $post->ID;</code></pre>\n<p>Then use $post_id string to assure you have the post ID. Example usage:</p>\n<pre class="wp-block-code"><code lang="php" class="language-php ">if ( get_post_type( $post_id ) != \'wpbdp_listing\' ) return;</code></pre>\n', $snippet->get_context() );
        $this->assertEquals( 'reference', $snippet->get_source() );
        $this->assertEquals( 'https://developer.wordpress.org/reference/functions/get_the_id/#comment-6361', $snippet->get_url() );
        $this->assertEquals( array( 'WordPress' ), $snippet->get_tags() );
        $this->assertEquals( array(), $snippet->get_command_tags() ); // @todo Add command tags
        $this->assertEquals( array( 'php' ), $snippet->get_code_language_tags() );
        $this->assertEquals( 'en-US', $snippet->get_language() );
        $this->assertEquals( 1, $snippet->get_version() );
        $this->assertEquals( $now , $snippet->get_parse_date() );
        $this->assertEquals( '2023-02-22T17:46:29', $snippet->get_code_creation_date() );
        $this->assertEquals( $now, $snippet->get_updated() );   
    }
}