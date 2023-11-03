<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('film_salle', function (Blueprint $table) {
            $table->id();
            $table->foreignId('film_id')->constrained();
            $table->foreignId('salle_id')->constrained();
            $table->dateTime('horraire');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seance');
    }
};
