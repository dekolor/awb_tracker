<?php

use App\Models\Package;
use App\Models\PackageEvents;
use App\Services\PackageUpdateService;

it('updates package status from latest event by statusDate', function () {
    $package = Package::factory()->create();

    $service = app(PackageUpdateService::class);

    $updates = [
        'response' => [
            [
                'status' => 'Colet in tranzit',
                'longStatus' => 'Package in transit',
                'location' => 'Bucharest',
                'destination' => 'Cluj',
                'statusDate' => '2025-08-01T10:00:00+00:00',
            ],
            [
                'status' => 'Colet livrat',
                'longStatus' => 'Package delivered',
                'location' => 'Cluj',
                'destination' => 'Cluj',
                'statusDate' => '2025-08-02T12:00:00+00:00',
            ],
        ],
    ];

    $service->processUpdates($package, $updates);

    $package->refresh();

    expect($package->status)->toBe('delivered');

    $latest = $package->events()->orderBy('statusDate', 'desc')->first();
    expect($latest->status)->toBe('Colet livrat');
});
