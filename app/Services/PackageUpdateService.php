<?php

namespace App\Services;

use App\Models\Package;
use App\Models\PackageEvents;
use Exception;

class PackageUpdateService
{
    public function processUpdates(Package $package, array $updates): void
    {

        foreach ($updates['response'] as $update) {
            $existingEvent = PackageEvents::where('package_id', $package->id)
                ->where('status', $update['status'])
                ->where('longstatus', $update['longStatus'])
                ->where('location', $update['location'])
                ->where('destination', $update['destination'])
                ->first();

            if (!$existingEvent) {
                PackageEvents::create([
                    'package_id' => $package->id,
                    'status' => $update['status'],
                    'longStatus' => $update['longStatus'],
                    'location' => $update['location'],
                    'destination' => $update['destination'],
                    'statusDate' => $update['statusDate'],
                ]);

                if ($this->isLatestEvent($package, $update['statusDate'])) {
                    if (str_contains($update['status'], 'livrat')) {
                        $status = 'delivered';
                    } elseif (str_contains($update['status'], 'ridicam')) {
                        $status = 'created';
                    } else {
                        $status = 'in-transit';
                    }

                    $package->update([
                        'status' => $status,
                        'origin' => $update['location'],
                        'destination' => $update['destination'] ?? $package->destination
                    ]);
                }
            }
        }
    }

    private function isLatestEvent(Package $package, string $createdAt): bool
    {
        $latestEvent = $package->events()->latest('createdAt')->first();
        return !$latestEvent || $createdAt >= $latestEvent->createdAt;
    }
}