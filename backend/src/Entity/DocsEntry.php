<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use DateTimeImmutable;
use Docsdangit\Backend\Service\Entity;
use Psr\Http\Message\UriInterface;

final class DocsEntry implements Entity
{
	public function __construct(
		public readonly CodeBlock $codeBlock,
		public readonly DateTimeImmutable $parseDate,
		public readonly UriInterface $url,
		public readonly CodeCreator $codeCreator,
		public readonly null|DateTimeImmutable $codeCreationDateTime,
		public readonly DocsSource $docsSource,
		public readonly DocsVersion $docsVersion,
		public readonly DocsFunction $docsFunction,
		public readonly CommandTags $commandTags,
		public readonly Tags $tags,
		public readonly Language $language,
	) {}
}
