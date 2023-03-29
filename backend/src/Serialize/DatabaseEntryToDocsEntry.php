<?php

/**
 * Copyright Andreas Heigl <andreas@heigl.org>
 *
 * Licensed under the MIT-license. For details see the included file LICENSE.md
 */
declare(strict_types=1);

namespace Docsdangit\Backend\Serialize;

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
use Docsdangit\Backend\Service\Entity;
use Laminas\Diactoros\Uri;
use Psr\Http\Message\ServerRequestInterface;
use function json_decode;

final class DatabaseEntryToDocsEntry
{

	public function unserialize(array $dbRow) : Entity
	{
		$codeBlocks = new CodeBlocks();

		$dbRow = json_decode($dbRow['object'], true);

		$commandTags = new CommandTags();
		foreach ($dbRow['command_tags'] as $command) {
			$commandTags = $commandTags->with(new CommandTag($command));
		}

		$tags = new Tags();
		foreach ($dbRow['tags'] as $tag) {
			$tags = $tags->with(new Tag($tag));
		}

		return new DocsEntry(
			new CodeBlock($dbRow['code_snippet'][0]['code'], $dbRow['code_snippet'][0]['language']),
			new DateTimeImmutable($dbRow['parse_date']),
			new Uri($dbRow['url']),
			new CodeCreator($dbRow['code_creator']),
			new DateTimeImmutable($dbRow['code_creation_datetime']),
			new DocsSource($dbRow['source']),
			new DocsVersion($dbRow['version']),
			new DocsFunction($dbRow['function']),
			$commandTags,
			$tags,
			new Language($dbRow['language'])
		);
	}
}
