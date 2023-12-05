<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilmSalle extends Model
{
    use HasFactory;
    protected $table = 'film_salle';
    public $timestamps = false;

    public function film()
    {
        return $this->belongsTo(Film::class, 'film_id');
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class, 'salle_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
