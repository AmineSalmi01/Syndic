<?php

namespace App\Models;

use App\Models\Pay;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName','lastName','email' , 'password','image','tele'
    ];

    public function payment()
    {
        return $this->hasMany(Pay::class, 'resident_id');
    }
}
