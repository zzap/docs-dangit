<?php

declare(strict_types=1);

namespace Docsdangit\Backend\Handler;

use Docsdangit\Backend\Serialize\DocsEntryToArray;
use Docsdangit\Backend\Service\Repository;
use Psr\Container\ContainerInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function assert;

class FetchEntityListHandlerFactory
{
    public function __invoke(ContainerInterface $container): RequestHandlerInterface
    {
        $docsEntryToArray = $container->get(DocsEntryToArray::class);

        $repository = $container->get(Repository::class);

        return new FetchEntityListHandler($repository, $docsEntryToArray);
    }
}
