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
        AwbStep::factory(10)->create();

        Carrier::factory()->create([
           'name' => 'Sameday',
           'logo' => 'https://sameday.ro/app/themes/samedaytwo/public/images/logo/sameday_logo_big_the_open_way_2x.webp'
        ]);

        Carrier::factory()->create([
            'name' => 'Fan Courier',
            'logo' => 'https://www.fancourier.ro/wp-content/uploads/2023/03/logo.svg'
        ]);

        Carrier::factory()->create([
            'name' => 'Cargus',
            'logo' => 'https://www.cargus.ro/wp-content/uploads/CG_LOGO_OGB_RGB-1.svg'
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
