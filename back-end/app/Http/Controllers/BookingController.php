<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function all()
    {
        $bookings = Booking::with(['barber', 'booker'])->get();
        return response()->json(['bookings' => $bookings]);
    }

    public function show($id)
    {
        $booking = Booking::with(['barber', 'booker'])->find($id);

        if ($booking) {
            return response()->json(['booking' => $booking]);
        } else {
            return response()->json(['message' => 'Booking not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
//            'service_id' => 'required|exists:services,id',
            'booker_id' => 'required|exists:bookers,id',
            'barber_id' => 'required|exists:barbers,id',
            'start_date_time' => 'required|date',
            'end_date_time' => 'required|date',
//            'status' => 'required|string',
        ]);

        $data = [
            'booker_id' => $request->input('booker_id'),
            'barber_id' => $request->input('barber_id'),
            'start_date_time' => $request->input('start_date_time'),
            'end_date_time' => $request->input('end_date_time'),
        ];

        $booking = Booking::create($data);

        return response()->json(['message' => 'Booking created successfully', 'booking' => $booking]);
    }

    public function destroy($id)
    {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->delete();
            return response()->json(['message' => 'Booking deleted successfully']);
        } else {
            return response()->json(['message' => 'Booking not found'], 404);
        }
    }
}
