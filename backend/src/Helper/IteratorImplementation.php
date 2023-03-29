<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Helper;

trait IteratorImplementation
{
	private abstract function &getList(): array;

	public function current() : mixed
	{
		return current($this->getList());
	}

	public function next() : void
	{
		next($this->getList());
	}

	public function key() : mixed
	{
		return key($this->getList());
	}

	public function valid() : bool
	{
		return null !== $this->key();
	}

	public function rewind() : void
	{
		reset($this->getList());
	}
}
