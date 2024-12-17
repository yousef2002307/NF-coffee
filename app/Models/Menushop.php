<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Menushop extends Model
{
    use HasFactory;
    protected $table = 'menushops';
    protected $guarded = [];

    protected $appends = ['image_url'];

    public function getImageAttribute($value)
    {
        return '/images/' . $value;
    }

    public function getImageUrlAttribute()
    {
        return $this->getImageAttribute($this->attributes['image']);
    }
}
