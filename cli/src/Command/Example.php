<?php
namespace Docsdangit\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class Example extends Command
{
    protected function configure()
    {
        $this->setName('example');
        return Command::SUCCESS;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('The Beast 😈');
        return Command::SUCCESS;
    }
}
