<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Stringable;

final class CodeCreator implements Stringable
{
	public function __construct(
		public readonly string $creator
	) {}

	public function __toString(): string
	{
		return $this->creator;
	}
}
