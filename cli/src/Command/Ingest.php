<?php
/**
 * Ingest Command
 *
 * @package Docsdangit
 */

namespace Docsdangit\Command;

use Docsdangit\Parsers\Make_WordPress;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Docsdangit\Parsers\WordPress_Docs;
use Docsdangit\Parsers\WP_CLI;
use Docsdangit\Parsers\PHP_Docs;

/**
 * Ingest Class
 */
class Ingest extends Command
{
    /**
     * Command configuration
     */
    protected function configure()
    {
        $this->setName('ingest')
            ->setDescription("Ingest docs")
            ->setHelp(<<<EOT
Ingest docs from different sources.

Usage:
<info>docsdangit ingest</info>
EOT);
    }

    /**
     * Command execution
     *
     * @param InputInterface $input Input Interface.
     * @param OutputInterface $output Output Interface.
     * @return Symfony\Component\Console\Command\Command
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $wp_docs = new Make_WordPress();
        $wp_docs->parse();
        $wp_docs = new WordPress_Docs();
        $wp_docs->parse();
        $wp_docs = new WP_CLI();
        $wp_docs->parse();
        $wp_docs = new PHP_Docs();
        $wp_docs->parse();

        $output->writeln('Done ✅');
        return Command::SUCCESS;
    }
}
