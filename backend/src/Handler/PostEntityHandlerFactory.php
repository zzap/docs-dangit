<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Handler;

use Docsdangit\Backend\Service\PostDocsEntryRequestBodyConverter;
use Docsdangit\Backend\Service\Repository;
use Docsdangit\Backend\Service\RequestBodyConverter;
use Mezzio\Helper\ServerUrlHelper;
use Mezzio\Router\RouterInterface;
use Psr\Container\ContainerInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function assert;

class PostEntityHandlerFactory
{
    public function __invoke(ContainerInterface $container): RequestHandlerInterface
    {
        $converter = $container->get(PostDocsEntryRequestBodyConverter::class);
        assert($converter instanceof RequestBodyConverter);

        $repository = $container->get(Repository::class);

        return new PostEntityHandler(
			$converter,
			$repository,
			$container->get(RouterInterface::class),
	        $container->get(ServerUrlHelper::class),
        );
    }
}
