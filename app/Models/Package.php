<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PackageEvents;

class Package extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'name',
        'description',
        'trackingNumber',
        'carrierId',
        'ownerId'
    ];

    public function events()
    {
        return $this->hasMany(PackageEvents::class);
    }

    public function carrier()
    {
        return $this->belongsTo(Carrier::class, 'carrierId');
    }
}
