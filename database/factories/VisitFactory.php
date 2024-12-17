<?php

namespace Database\Factories;

use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

class VisitFactory extends Factory
{
    protected $model = Visit::class;

    public function definition()
    {
        return [
            'page' => $this->faker->url(), // Random URL for the page visited
            'visitor_ip' => $this->faker->ipv4(), // Random IPv4 address
           'created_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-31'),
        ];
    }
}