<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class CORS implements MiddlewareInterface
{

	public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
	{
		return $handler->handle($request)->withAddedHeader('access-control-allow-origin', '*');
	}
}
