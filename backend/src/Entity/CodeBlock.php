<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

final class CodeBlock
{
	public function __construct(
		public readonly string $code,
		public readonly string $language,
	) {}
}
