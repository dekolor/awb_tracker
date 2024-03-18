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
        // \App\Models\User::factory(10)->create();

//        Awb::factory(10)->create();
//        AwbStep::factory(10)->create();

        Carrier::factory()->create([
           'name' => 'Sameday',
           'logo' => '/img/logo-sameday.webp'
        ]);

        Carrier::factory()->create([
            'name' => 'Fan Courier',
            'logo' => '/img/logo-fan.svg'
        ]);

        Carrier::factory()->create([
            'name' => 'Cargus',
            'logo' => '/img/logo-cargus.svg'
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
