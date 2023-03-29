<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Stringable;

class CommandTag implements Stringable
{
	public function __construct(
		public readonly string $commandTag
	) {}

	public function __toString(): string
	{
		return $this->commandTag;
	}
}
