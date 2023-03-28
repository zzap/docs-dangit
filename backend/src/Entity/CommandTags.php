<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Docsdangit\Backend\Helper\IteratorImplementation;
use Iterator;

final class CommandTags implements Iterator
{
	use IteratorImplementation;

	private array $tags;

	public function __construct(CommandTag ...$tags)
	{
		$this->tags = $tags;
	}

	private function &getList() : array
	{
		return $this->tags;
	}

	public function with(CommandTag $commandTag): CommandTags
	{
		return new self(...array_merge($this->tags, [$commandTag]));
	}
}
