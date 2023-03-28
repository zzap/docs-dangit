<?php

namespace Docsdangit\Backend\Service;

use Psr\Http\Message\ServerRequestInterface;

interface RequestBodyConverter
{
	/**
	 * @return Entity[]
	 */
	public function convert(ServerRequestInterface $request): array;
}
