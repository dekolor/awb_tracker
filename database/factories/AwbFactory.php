<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Awb>
 */
class AwbFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'awb_number' => 'AWB' . fake()->randomNumber(9, 1),
            'tag' => fake()->slug
        ];
    }
}
