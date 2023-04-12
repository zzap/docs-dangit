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
use Symfony\Component\Console\Input\InputDefinition;
use Symfony\Component\Console\Input\InputOption;

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
            ->setDefinition(
                new InputDefinition([
                    new InputOption('source', 's', InputOption::VALUE_OPTIONAL, 'Docs source (wp-docs, php-docs, wp-cli, wp-dev). All sources by default.'),
                    new InputOption('cli-dump-path', 'dp', InputOption::VALUE_OPTIONAL, 'WP CLI dump file path'),
                    new InputOption('cli-version-path', 'vp', InputOption::VALUE_OPTIONAL, 'WP CLI version file path')
                ])
            );
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
        $source = $input->getOption('source');
        if( ! $source || 'wp-docs' === $source ) {
            $output->writeln('🚀 Ingesting WordPress Docs...');
            $wp_docs = new WordPress_Docs();
            $wp_docs->parse();
        }
        if( ! $source || 'wp-cli' === $source ) {
            $output->writeln('🚀 Ingesting WP CLI Docs...');
            $cli_dump_path = $input->getOption('cli-dump-path');
            $cli_version_path = $input->getOption('cli-version-path');
            $wp_docs = new WP_CLI( $cli_dump_path, $cli_version_path );
            $wp_docs->parse();
        }
        if( ! $source || 'php-docs' === $source ) {
            $output->writeln('🚀 Ingesting PHP Docs...');
            $wp_docs = new PHP_Docs();
            $wp_docs->parse();
        }
        if( ! $source || 'wp-dev' === $source ) {
            $output->writeln('🚀 Ingesting WordPress Dev Blog Docs...');
            $wp_docs = new Make_WordPress();
            $wp_docs->parse();
        }

        $output->writeln('Done ✅');
        return Command::SUCCESS;
    }
}
