<?php

namespace App\Services;

use App\Models\Package;
use App\Models\PackageEvents;
use Exception;

class PackageUpdateService
{
    public function processUpdates(Package $package, array $updates): void
    {
        // 1) Upsert new events (idempotent by including statusDate in the match)
        foreach ($updates['response'] as $update) {
            // Normalize values
            $status = $update['status'] ?? null;
            $longStatus = $update['longStatus'] ?? null;
            $location = $update['location'] ?? null;
            $destination = $update['destination'] ?? null;
            $statusDate = $update['statusDate'] ?? null;

            $location = ($location === '') ? null : $location;
            $destination = ($destination === '') ? null : $destination;

            $existingEvent = PackageEvents::where('package_id', $package->id)
                ->where('status', $status)
                ->where('longStatus', $longStatus)
                ->where('location', $location)
                ->where('destination', $destination)
                ->where('statusDate', $statusDate)
                ->first();

            if (!$existingEvent) {
                PackageEvents::create([
                    'package_id' => $package->id,
                    'status' => $status,
                    'longStatus' => $longStatus,
                    'location' => $location,
                    'destination' => $destination,
                    'statusDate' => $statusDate,
                ]);
            }
        }

        // 2) Find the latest event by statusDate and update the package once
        $latestEvent = $package->events()
            ->orderBy('statusDate', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();

        if ($latestEvent) {
            $status = $this->deriveStatusFromEvent($latestEvent->status);

            $package->update([
                'status' => $status,
                'origin' => $latestEvent->location,
                'destination' => $latestEvent->destination ?? $package->destination,
            ]);
        }
    }

    private function deriveStatusFromEvent(string $eventStatus): string
    {
        $lower = mb_strtolower($eventStatus);
        if (str_contains($lower, 'livrat')) {
            return 'delivered';
        }
        if (str_contains($lower, 'ridicam')) {
            return 'created';
        }
        return 'in-transit';
    }
}