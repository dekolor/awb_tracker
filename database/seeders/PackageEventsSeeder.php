<?php

namespace Database\Seeders;

use App\Models\PackageEvents;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PackageEvents::factory()->count(3)->create();
    }
}
