<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create about 5 notes for each user 
        User::factory(10)->create(); 

        $user = User::all(); 

        $user->each(function ($user) {
            Note::factory(5)->create([
                'user_id' => $user->id,
            ]);
        });


    }
}
