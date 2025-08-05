<?php

namespace App\Contracts;

interface CarrierInterface
{
    public function trackPackage(string $trackingNumber): array;

    public function getCarrierName(): string;
}