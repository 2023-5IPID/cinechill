<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class Film extends Model
{
    use HasFactory;

    // protected $table ="films";
    protected $fillable = [
        'titre',
        'realisateur',
        'duree_min',
        'genre',
        'annee_sortie',
    ];

    public function salles()
    {
        /**
         * The roles that belong to the Film
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
         */
        return $this->belongsToMany(Salle::class)
        ->withTimestamps()
        ->as('seance');
    }
}
