<?php
/**
 * Snippets Entity
 *
 * @package Docsdangit
 */
namespace Docsdangit\Data;

/**
 * Snippet class
 *
 * Represent a snippet item.
 */
class Snippet {
    private string $id;
    private string $title;
    private array $snippets;
    private string $context;
    private string $source;
    private array $tags;
    private array $command_tags;
    private array $code_language_tags;
    private string $language;
    private string $version;
    private string $url;
    private string $creator;
    private string $parse_date;
    private string $code_creation_date;
    private string $updated;

    /**
     * Snippets constructor.
     *
     * @param string $id
     * @param string $title
     * @param array $snippets
     * @param string $context
     * @param string $source
     * @param array $tags
     * @param array $command_tags
     * @param array $code_language_tags
     * @param string $language
     * @param string $version
     * @param string $url
     * @param string $creator
     * @param string $parse_date
     * @param string $code_creation_date
     * @param string $updated
     */
    public function __construct(
        string $id,
        string $title,
        array $snippets,
        string $context,
        string $source,
        array $tags,
        array $command_tags,
        array $code_language_tags,
        string $language,
        string $version,
        string $url,
        string $creator,
        string $parse_date,
        string $code_creation_date,
        string $updated
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->snippets = $snippets;
        $this->context = $context;
        $this->source = $source;
        $this->tags = $tags;
        $this->command_tags = $command_tags;
        $this->code_language_tags = $code_language_tags;
        $this->language = $language;
        $this->version = $version;
        $this->url = $url;
        $this->creator = $creator;
        $this->parse_date = $parse_date;
        $this->code_creation_date = $code_creation_date;
        $this->updated = $updated;
    }

    public function get_id() : string {
        return $this->id;
    }

    public function get_title() : string {
        return $this->title;
    }

    public function get_snippets() : array {
        return $this->snippets;
    }

    public function get_context() : string {
        return $this->context;
    }

    public function get_source() : string {
        return $this->source;
    }

    public function get_tags() : array {
        return $this->tags;
    }

    public function get_command_tags() : array {
        return $this->command_tags;
    }

    public function get_code_language_tags() : array {
        return $this->code_language_tags;
    }

    public function get_language() : string {
        return $this->language;
    }

    public function get_version() : string {
        return $this->version;
    }

    public function get_url() : string {
        return $this->url;
    }

    public function get_creator() : string {
        return $this->creator;
    }

    public function get_parse_date() : string {
        return $this->parse_date;
    }

    public function get_code_creation_date() : string {
        return $this->code_creation_date;
    }

    public function get_updated() : string {
        return $this->updated;
    }

    public function get_all() : array {
        return (array) $this;
    }

}
