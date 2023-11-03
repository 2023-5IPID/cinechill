<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Film>
 */
class FilmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Film::class;

    public function definition(): array
    {
        return [
            'titre' => fake()->word(),
            'realisateur' => fake()->name(),
            'duree_min' => fake()->randomDigitNotNull(),
            'genre' => fake()->word(),
            'annee_sortie' => fake()->date(),
        ];
    }
}
