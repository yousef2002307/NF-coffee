<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\OrderDetail;
use App\Models\Cart;
use App\Models\Rating;

class Product extends Model
{
 use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        "name_ar",
        "desc_ar"
    ];
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function cart()
    {
        return $this->hasMany(Cart::class);
    }
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    protected $appends = ['image_url'];

    public function getImageAttribute($value)
    {
        return '/images/' . $value;
    }

    public function getImageUrlAttribute()
    {
        return $this->getImageAttribute($this->attributes['image']);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites', 'product_id', 'user_id');
    }
}
