<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Stringable;

class DocsFunction implements Stringable
{
	public function __construct(
		public readonly string $docsFunction
	) {}

	public function __toString(): string
	{
		return $this->docsFunction;
	}
}
