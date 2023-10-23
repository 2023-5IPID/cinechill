<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    protected $fillable = ['nom', 'places', 'notes'];

    public static $rules = [
        'nom' => 'required|string|max:255',
        'places' => 'required|integer|min:1',
        'notes' => 'nullable|string',
    ];
}
