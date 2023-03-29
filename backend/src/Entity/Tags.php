<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Entity;

use Docsdangit\Backend\Helper\IteratorImplementation;
use Iterator;

final class Tags implements Iterator
{
	use IteratorImplementation;

	private array $tags;

	public function __construct(Tag ...$tags)
	{
		$this->tags = $tags;
	}

	private function &getList() : array
	{
		return $this->tags;
	}

	public function with(Tag $tag): Tags
	{
		return new self(...array_merge($this->tags, [$tag]));
	}

}
