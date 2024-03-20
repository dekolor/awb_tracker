<?php

namespace App\Helpers;

use App\Models\Awb;
use Illuminate\Support\Facades\Http;

class DiscordHelper
{
    public static function sendNotification(Awb $awb, $content)
    {
        $response = Http::post($awb->notifications_discord_webhook, [
            'content' => $content,
            'username' => 'awb_tracker'
        ]);
    }
}
