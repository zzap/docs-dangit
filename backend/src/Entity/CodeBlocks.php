<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Docsdangit\Backend\Helper\IteratorImplementation;
use Iterator;

final class CodeBlocks implements Iterator
{
	use IteratorImplementation;

	private array $tags;

	public function __construct(CodeBlock ...$tags)
	{
		$this->tags = $tags;
	}

	private function &getList() : array
	{
		return $this->tags;
	}

	public function with(CodeBlock $codeBlock): CodeBlocks
	{
		return new CodeBlocks(...array_merge($this->tags, [$codeBlock]));
	}
}
