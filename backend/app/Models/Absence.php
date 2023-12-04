<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = [
        'date_debut', 
        'date_fin', 
        'motif',
        'employer_id'
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

}
