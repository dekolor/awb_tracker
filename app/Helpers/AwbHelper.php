<?php

namespace App\Helpers;

use App\Models\Awb;
use App\Models\AwbStep;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Http;

class AwbHelper
{
    public static function check(Awb $awb)
    {
        $lastStatus = $awb->steps->sortBy('status_date')->last();
        $statusCode = $lastStatus ? $lastStatus->status_code : "0";
        switch ($awb->carrier->id) {
            case 1:
                // sameday carrier

                // final status code for sameday is 9
                if ($statusCode != "9") {
                    echo "checking awb for " . $awb->tag . "\n";
                    AwbHelper::sameday($awb);
                } else {
                    echo "package already delivered, skipping... (" . $awb->tag . ")\n";
                }
                break;
            case 2:
                // fan courier carrier

                // final status code for fan courier is S2
                if ($statusCode != "S2") {
                    echo "checking awb for " . $awb->tag . "\n";
                    AwbHelper::fancourier($awb);
                } else {
                    echo "package already delivered, skipping... (" . $awb->tag . ")\n";
                }
                break;
            default:
                throw new ModelNotFoundException();
        }
    }

    public static function checkAll()
    {
        $awbs = Awb::all();

        foreach ($awbs as $awb) {
            static::check($awb);
        }
    }

    public static function sameday(Awb $awb): void
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get('https://api.sameday.ro/api/public/awb/' . $awb->awb_number . '/awb-history?_locale=ro');

        $awbSteps = json_decode($response->body(), TRUE);

        if (!array_key_exists('error', $awbSteps)) {
            static::processAwbSteps($awb, $awbSteps, 'awbHistory', [
                'county' => 'county',
                'country' => 'country',
                'status_long' => 'status',
                'status_code' => 'statusId',
                'status_short' => 'statusState',
                'status_state_code' => 'statusStateId',
                'transit_location' => 'transitLocation',
                'status_date' => 'statusDate'
            ]);
        }
    }

    public static function fancourier(Awb $awb): void
    {
        $response = Http::asForm()->post('https://www.fancourier.ro/limit-tracking.php', [
            'action' => 'get_awb',
            'awb' => $awb->awb_number
        ]);

        $awbSteps = json_decode($response->body(), TRUE);

        if (!empty($awbSteps)) {
            static::processAwbSteps($awb, $awbSteps, 'events', [
                'county' => 'location',
                'country' => '',
                'status_long' => 'name',
                'status_code' => 'id',
                'status_short' => 'name',
                'status_state_code' => 'id',
                'transit_location' => '',
                'status_date' => 'date'
            ]);
        }
    }

    private static function processAwbSteps($awb, $awbSteps, $stepsKey, $keys)
    {
        foreach ($awbSteps[$stepsKey] as $awbStep) {
            $step = AwbStep::where('awb_id', $awb->id)
                ->where('county', $awbStep[$keys['county']] ?? '')
                ->where('country', $awbStep[$keys['country']] ?? '')
                ->where('status_long', $awbStep[$keys['status_long']] ?? '')
                ->where('status_code', $awbStep[$keys['status_code']] ?? '')
                ->where('status_short', $awbStep[$keys['status_short']] ?? '')
                ->where('status_state_code', $awbStep[$keys['status_state_code']] ?? '')
                ->where('transit_location', $awbStep[$keys['transit_location']] ?? '')
                ->where('status_date', $awbStep[$keys['status_date']] ?? '')
                ->first();
            if (!$step) {
                // new awb status
                AwbStep::create([
                    'awb_id' => $awb->id,
                    'county' => $awbStep[$keys['county']] ?? '',
                    'country' => $awbStep[$keys['country']] ?? '',
                    'status_long' => $awbStep[$keys['status_long']] ?? '',
                    'status_code' => $awbStep[$keys['status_code']] ?? '',
                    'status_short' => $awbStep[$keys['status_short']] ?? '',
                    'status_state_code' => $awbStep[$keys['status_state_code']] ?? '',
                    'transit_location' => $awbStep[$keys['transit_location']] ?? '',
                    'status_date' => $awbStep[$keys['status_date']] ?? ''
                ]);

                if($awb->has_discord_notifications) {
                    DiscordHelper::sendNotification($awb, 'AWB ' . $awb->awb_number . ' [' . $awb->tag . '] - New status: ' . $awbStep[$keys['status_long']] . ' [' . $awbStep[$keys['status_date']] . ']');
                }
            }
        }
    }
}
