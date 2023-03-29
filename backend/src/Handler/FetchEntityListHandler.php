<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Handler;

use Docsdangit\Backend\Serialize\DocsEntryToArray;
use Docsdangit\Backend\Service\Repository;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class FetchEntityListHandler implements RequestHandlerInterface
{
	public function __construct(
		private readonly Repository $repository,
		private readonly DocsEntryToArray $serializer
	) {}

	public function handle(ServerRequestInterface $request) : ResponseInterface
	{
		$query = $request->getQueryParams();

		$search = null;
		if (isset($query['search'])) {
			$search = $query['search'];
		}

		$search = null;
		if (isset($query['search'])) {
			$search = $query['search'];
		}

		$limit = 15;
		if (isset($query['limit'])) {
			$limit = (int) $query['limit'];
		}

		$offset = 0;
		if (isset($query['offset'])) {
			$offset = (int) $query['offset'];
		}

		$results = $this->repository->fetch($search, $limit, $offset);

		$response = [];
		foreach ($results as $result) {
			$response[] = $this->serializer->serialize($result);
		}

		return new JsonResponse($response);
	}
}
