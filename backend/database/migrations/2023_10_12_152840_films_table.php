<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\HasApiTokens;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('realisateur');
            $table->string('duree_min');
            $table->string('genre');
            $table->date('annee_sortie');
            $table->timestamps();
        });  //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
