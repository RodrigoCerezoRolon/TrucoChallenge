<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profiles = ['Players', 'Administrator', 'Consultant'];
        foreach ($profiles as $profile) {
            Profile::create([
                'name' => $profile
            ]);
        }
    }
}
