<?php

namespace App\Models;
use App\Models\Syndic;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class annonce extends Model
{
    use HasFactory;
    public function syndic(){
        return $this->belongsTo(Syndic::class);
    }
}
