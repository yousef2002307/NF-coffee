<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run()
    {
        // Create 10 blog entries
        Blog::factory()->count(30)->create();
    }
}