<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Carrier;

class CarrierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Carrier::create([
            'name' => 'Sameday',
            'websiteUrl' => 'https://www.sameday.ro',
            'trackingUrl' => 'https://www.sameday.ro/track?trackingNumber={trackingNumber}',
            'logoUrl' => 'https://example.com/sameday-logo.png',
        ]);
    }
}
