<?php

namespace Database\Factories;

use App\Models\Awb;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AwbStep>
 */
class AwbStepFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'awb_number' => Awb::factory(),
            'county' => 'Ilfov',
            'country' => 'Romania',
            'status_long' => fake()->paragraph,
            'status_code' => fake()->randomNumber(2),
            'status_short' => fake()->slug,
            'status_state_code' => fake()->randomNumber(2),
            'transit_location' => '',
            'status_date' => fake()->dateTime
        ];
    }
}
