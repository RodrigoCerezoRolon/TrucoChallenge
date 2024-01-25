<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = date('Y');
        $i=0;
        while($i<20){
            Game::create([
                'player_id' => rand(1, 5),
                'start_date' => fake()->date('Y-m-d', $currentYear . '-12-31'),
                'finish_date' => fake()->date('Y-m-d','now'),
                'points' => rand(0, 30),
                'is_winner' => rand(1, 0),
                'amount_envido' => rand(1, 5),
                'amount_flower' => rand(1, 5),
            ]);
            $i++;
        }
      
    }
}
