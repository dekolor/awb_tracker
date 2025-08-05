<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Contracts\CarrierInterface;
use Exception;

class SamedayService implements CarrierInterface
{
    public function trackPackage(string $trackingNumber): array
    {
        $response = Http::get("https://api.sameday.ro/api/public/awb/$trackingNumber/awb-history");

        if ($response->clientError()) {
            throw new Exception("Client error while tracking package: " . $response->body());
        }

        $response = json_decode($response, true);


        try {
            $formattedResponse = collect($response['awbHistory'])->map(function ($event) {
                return [
                    'status' => $event['statusState'],
                    'longStatus' => $event['status'],
                    'location' => $event['county'] ?? '',
                    'destination' => $event['transitLocation'] ?? '',
                    'statusDate' => $event['statusDate'],
                ];
            })->toArray();

            return ['response' => $formattedResponse, 'trackingNumber' => $trackingNumber];
        } catch (Exception $e) {
            throw new Exception("Error formatting response: " . $e->getMessage());
        }
    }

    public function getCarrierName(): string
    {
        return 'Sameday';
    }
}