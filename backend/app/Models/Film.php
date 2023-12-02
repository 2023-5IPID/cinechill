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
        'resume',
        'duree_min',
        'genre',
        'annee_sortie',
        'poster_path',
    ];

    public function salles()
    {
        /**
         * The roles that belong to the Film
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
         */
        return $this->belongsToMany(Salle::class, 'film_salle', 'salle_id', 'film_id');
    }
}
