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
        'tag'
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
