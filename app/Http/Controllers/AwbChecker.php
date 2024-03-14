<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use App\Models\AwbStep;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AwbChecker extends Controller
{
    public function check(Awb $awb)
    {
        switch ($awb->carrier->id) {
            case 1:
                static::sameday($awb);
                break;
            case 2:
                static::fancourier($awb);
                break;
            default:
                throw new ModelNotFoundException();
        }
    }

    protected function sameday(Awb $awb)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get('https://api.sameday.ro/api/public/awb/' . $awb->awb_number . '/awb-history?_locale=ro');

        $awbSteps = json_decode($response->body(), TRUE);

        foreach($awbSteps['awbHistory'] as $awbStep) {
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

    protected function fancourier(Awb $awb)
    {
        $response = Http::asForm()->post('https://www.fancourier.ro/limit-tracking.php', [
            'action' => 'get_awb',
            'awb' => $awb->awb_number
        ]);

        $awbSteps = json_decode($response->body(), TRUE);

        if(!empty($awbStep)) {
            foreach($awbSteps['events'] as $awbStep) {
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
