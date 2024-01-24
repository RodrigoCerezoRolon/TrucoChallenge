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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('player_id');
            $table->date('start_date');
            $table->date('finish_date');
            $table->tinyInteger('points');
            $table->boolean('is_winner');
            $table->tinyInteger('amount_envido');
            $table->tinyInteger('amount_flower');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
