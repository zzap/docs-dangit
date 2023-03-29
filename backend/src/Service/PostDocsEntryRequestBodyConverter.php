<?php

/**
 * Copyright Andreas Heigl <andreas@heigl.org>
 *
 * Licensed under the MIT-license. For details see the included file LICENSE.md
 */
declare(strict_types=1);

namespace Docsdangit\Backend\Service;

use DateTimeImmutable;
use Docsdangit\Backend\Entity\CodeBlock;
use Docsdangit\Backend\Entity\CodeBlocks;
use Docsdangit\Backend\Entity\CodeCreator;
use Docsdangit\Backend\Entity\CommandTag;
use Docsdangit\Backend\Entity\CommandTags;
use Docsdangit\Backend\Entity\DocsEntry;
use Docsdangit\Backend\Entity\DocsFunction;
use Docsdangit\Backend\Entity\DocsSource;
use Docsdangit\Backend\Entity\DocsVersion;
use Docsdangit\Backend\Entity\Language;
use Docsdangit\Backend\Entity\Tag;
use Docsdangit\Backend\Entity\Tags;
use Laminas\Diactoros\Uri;
use Psr\Http\Message\ServerRequestInterface;
use function json_decode;

final class PostDocsEntryRequestBodyConverter implements RequestBodyConverter
{

	public function convert(ServerRequestInterface $request) : array
	{
		$entities = [];

		$data = $request->getBody()->getContents();
		$data = json_decode($data, true);

		$tags = new Tags();
		foreach ($data['tags'] as $tag) {
			$tags = $tags->with(new Tag($tag));
		}

		$commandTags = new CommandTags();
		foreach ($data['command_tags'] as $command) {
			$commandTags = $commandTags->with(new CommandTag($command));
		}

		foreach ($data['code_snippet'] as $snippet) {
			$entities[] = new DocsEntry(
				new CodeBlock(trim($snippet['code']), $snippet['language']),
				new DateTimeImmutable($data['parse_date']),
				new Uri($data['url']),
				new CodeCreator($data['code_creator']),
				new DateTimeImmutable($data['code_creation_datetime']),
				new DocsSource($data['source']),
				new DocsVersion($data['version']),
				new DocsFunction($data['title'] ?? $data['function'] ?? ''),
				$commandTags,
				$tags,
				new Language($data['language'])
			);
		}

		return $entities;
	}
}
