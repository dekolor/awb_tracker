<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Awb extends Model
{
    use HasFactory;

    protected $fillable = [
        'awb_number',
        'carrier_id',
        'tag',
        'has_email_notifications',
        'has_discord_notifications',
        'notifications_mail_address',
        'notifications_discord_webhook'
    ];

    public function steps()
    {
        return $this->hasMany(AwbStep::class, 'awb_id');
    }

    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }
}
