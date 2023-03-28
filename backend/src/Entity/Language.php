<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Stringable;

class Language implements Stringable
{
	public function __construct(
		public readonly string $language
	) {}

	public function __toString(): string
	{
		return $this->language;
	}
}
