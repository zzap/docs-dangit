<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Handler;

use Docsdangit\Backend\Entity\DocsEntry;
use Docsdangit\Backend\Service\Repository;
use Docsdangit\Backend\Service\RequestBodyConverter;
use Laminas\Diactoros\Response\RedirectResponse;
use Mezzio\Helper\ServerUrlHelper;
use Mezzio\Router\RouterInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class PostEntityHandler implements RequestHandlerInterface
{
	public function __construct(
		private RequestBodyConverter $requestBodyConverter,
		private Repository $repository,
		private RouterInterface $router,
		private ServerUrlHelper $serverUrlHelper,
	) {}

	public function handle(ServerRequestInterface $request) : ResponseInterface
	{
		/** @var DocsEntry $entity */
		$entities = $this->requestBodyConverter->convert($request);

		$this->repository->cleanup((string) ($entities[0]->url));
		foreach ($entities as $entity) {
			$this->repository->store($entity);
		}

		$route = $this->router->generateUri(
			'api.entity.show',
			['hash' => hash('sha512', (string) $entity->url)],
		);
		return new RedirectResponse($this->serverUrlHelper->generate($route), 201);
	}
}
