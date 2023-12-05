<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id', 'seance_id', 'nb_places'];

    public function filmSalle()
    {
        /**
         * The roles that belong to the Film
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
         */
        return $this->belongsTo(FilmSalle::class, 'seance_id', 'id');
    }

    public function user()
    {
        /**
         * The roles that belong to the Film
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
         */
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
