<?php

namespace App\Console\Commands;

use App\Models\Package;
use App\Services\CarrierManager;
use App\Services\PackageUpdateService;
use Illuminate\Console\Command;

class FetchPackageUpdates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'packages:fetch-updates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch updates for all active packages';

    public function __construct(private CarrierManager $carrierManager, private PackageUpdateService $packageUpdateService)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $successCount = 0;
        $errorCount = 0;

        $activePackages = Package::where('status', '!=', 'delivered')->get();

        if ($activePackages->isEmpty()) {
            $this->info('No active packages found.');
            return;
        }

        $this->info("Fetching updates for " . $activePackages->count() . " active packages...");

        foreach ($activePackages as $package) {
            try {
                $carrierService = $this->carrierManager->driver($package->carrier->name);

                $updates = $carrierService->trackPackage($package->trackingNumber);

                $this->packageUpdateService->processUpdates($package, $updates);

                $successCount++;

            } catch (\Exception $e) {
                $this->error("Failed to update package " . $package->trackingNumber . ": " . $e->getMessage());
                $errorCount++;

                \Log::error("Package update failed", [
                    'package_id' => $package->id,
                    'tracking_number' => $package->tracking_number,
                    'carrier' => $package->carrier->name,
                    'error' => $e->getMessage()
                ]);
            }
        }

        $this->info("Update process completed: $successCount packages updated successfully, $errorCount errors encountered.");

        return;
    }
}
