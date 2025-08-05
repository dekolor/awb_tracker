<?php

namespace App\Services;

use App\Contracts\CarrierInterface;
use App\Services\SamedayService;

class CarrierManager
{
    public function driver(string $carrier): CarrierInterface
    {
        return match ($carrier) {
            'Sameday' => app(SamedayService::class),
            default => throw new \InvalidArgumentException("Carrier [$carrier] is not supported."),
        };
    }
}