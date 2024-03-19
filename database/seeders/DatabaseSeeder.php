<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Awb;
use App\Models\AwbStep;
use App\Models\Carrier;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Carrier::factory()->create([
           'name' => 'Sameday',
           'logo' => '/img/logo-sameday.webp'
        ]);

        Carrier::factory()->create([
            'name' => 'Fan Courier',
            'logo' => '/img/logo-fan.svg'
        ]);

         \App\Models\User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
             'password' => 'password123'
         ]);
    }
}
