<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\User;

class Syndic extends Model
{
    use HasFactory;

    protected $fillable = [
        'email' , 'password'
    ];

    public function isSyndic()
    {
        return $this->email == "mohsin@gmail.com";
    }
}
