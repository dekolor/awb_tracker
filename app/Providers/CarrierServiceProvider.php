<?php

namespace App\Providers;

use App\Services\CarrierManager;
use App\Services\PackageUpdateService;
use Illuminate\Support\ServiceProvider;

class CarrierServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(CarrierManager::class);
        $this->app->singleton(PackageUpdateService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
