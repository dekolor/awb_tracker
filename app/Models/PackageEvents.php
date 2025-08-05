<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageEvents extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'status',
        'longStatus',
        'location',
        'destination',
        'statusDate', // Added to store the date of the status update
    ];
}
