<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use App\Models\AwbStep;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AwbChecker extends Controller
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
                    static::sameday($awb);
                } else {
                    echo "package already delivered, skipping... (" . $awb->tag . ")\n";
                }
                break;
            case 2:
                // fan courier carrier

                // final status code for fan courier is S2
                if ($statusCode != "S2") {
                    echo "checking awb for " . $awb->tag . "\n";
                    static::fancourier($awb);
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

    protected static function sameday(Awb $awb)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get('https://api.sameday.ro/api/public/awb/' . $awb->awb_number . '/awb-history?_locale=ro');

        $awbSteps = json_decode($response->body(), TRUE);

        if (!array_key_exists('error', $awbSteps)) {
            foreach ($awbSteps['awbHistory'] as $awbStep) {
                AwbStep::updateOrCreate([
                    'awb_id' => $awb->id,
                    'county' => $awbStep['county'],
                    'country' => $awbStep['country'],
                    'status_long' => $awbStep['status'],
                    'status_code' => $awbStep['statusId'],
                    'status_short' => $awbStep['statusState'],
                    'status_state_code' => $awbStep['statusStateId'],
                    'transit_location' => $awbStep['transitLocation'],
                    'status_date' => $awbStep['statusDate']
                ]);
            }
        }
    }

    protected static function fancourier(Awb $awb)
    {
        $response = Http::asForm()->post('https://www.fancourier.ro/limit-tracking.php', [
            'action' => 'get_awb',
            'awb' => $awb->awb_number
        ]);

        $awbSteps = json_decode($response->body(), TRUE);

        if (!empty($awbSteps)) {
            foreach ($awbSteps['events'] as $awbStep) {
                AwbStep::updateOrCreate([
                    'awb_id' => $awb->id,
                    'county' => $awbStep['location'],
                    'country' => '',
                    'status_long' => $awbStep['name'],
                    'status_code' => $awbStep['id'],
                    'status_short' => $awbStep['name'],
                    'status_state_code' => $awbStep['id'],
                    'transit_location' => '',
                    'status_date' => $awbStep['date']
                ]);
            }
        }
    }
}
