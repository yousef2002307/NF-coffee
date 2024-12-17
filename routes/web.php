<?php

use Illuminate\Support\Facades\Route;

Route::any('/{any}', function(){
    return inertia('main');
})->where('any', '.*');
