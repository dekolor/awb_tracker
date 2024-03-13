<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use App\Models\AwbStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AwbChecker extends Controller
{
    public function check(Awb $awb)
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
}
