<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class OrderDetail extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $hidden = [
        'updated_at'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
