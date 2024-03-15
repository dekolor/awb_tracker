<?php

namespace App\Console\Commands;

use App\Http\Controllers\AwbChecker;
use Illuminate\Console\Command;

class CheckAllPackages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-all-packages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check the status of all undelivered packages.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        AwbChecker::checkAll();
    }
}
