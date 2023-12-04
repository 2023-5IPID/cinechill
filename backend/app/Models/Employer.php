<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom', 
        'prenom', 
        'tel', 
        'statut'
    ];

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }
   
}
