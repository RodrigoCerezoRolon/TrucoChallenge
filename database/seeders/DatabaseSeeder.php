<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProfileSeeder::class,
            UserSeeder::class,
            GameSeeder::class,
        ]);
        User::create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => 'password',
            'profile_id' => 2
        ]);
    }
}
