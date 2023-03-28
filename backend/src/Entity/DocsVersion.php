<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Stringable;

class DocsVersion implements Stringable
{
	public function __construct(
		public readonly string $docsSource
	) {}

	public function __toString(): string
	{
		return $this->docsSource;
	}
}
