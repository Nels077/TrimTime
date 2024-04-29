<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booker extends Model
{
    use HasFactory;

    protected $fillable = ['booker_name', 'booker_email', 'booker_contact'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
