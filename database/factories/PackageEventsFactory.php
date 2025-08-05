<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PackageEvents>
 */
class PackageEventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id' => 1,
            'status' => $this->faker->word,
            'longStatus' => $this->faker->sentence,
            'location' => $this->faker->city,
            'destination' => $this->faker->city,
        ];
    }
}
