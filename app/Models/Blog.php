<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image',
        'title',
        'description',
        'content',
    ];

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
