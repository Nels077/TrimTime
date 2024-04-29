<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['booker_id', 'barber_id', 'start_date_time', 'end_date_time'];

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }

    public function booker()
    {
        return $this->belongsTo(Booker::class);
    }
}
