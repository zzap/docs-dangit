<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Handler;

use Docsdangit\Backend\Serialize\DocsEntryToArray;
use Docsdangit\Backend\Service\Repository;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class FetchEntityHandler implements RequestHandlerInterface
{
	public function __construct(
		private readonly Repository $repository,
		private readonly DocsEntryToArray $serializer
	) {}

	public function handle(ServerRequestInterface $request) : ResponseInterface
	{
		$result = $this->repository->fetchSingle($request->getAttribute('hash'));

		return new JsonResponse($this->serializer->serialize($result));
	}
}
