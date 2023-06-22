<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pay extends Model
{
    use HasFactory;

    public function syndic()
    {
        return $this->belongsTo(Syndic::class);
    }
    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
