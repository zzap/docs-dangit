<?php

namespace Docsdangit\Backend\Service;

interface Repository
{
	public function store(Entity $entity): void;

	public function fetch(string|null $search, int $limit, int $offset): array;

	public function fetchSingle(string $hash): Entity;

	public function cleanup(string $url): void;
}
