<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Awb extends Model
{
    use HasFactory;

    public function steps()
    {
        return $this->hasMany(AwbStep::class, 'awb_number');
    }
}
