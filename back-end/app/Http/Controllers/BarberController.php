<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Barbershop;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\Barber;

class BarberController extends Controller
{
    public function all()
    {
        $barbers = Barber::all();
        return response()->json(['barbers' => $barbers]);
    }

    public function show($id)
    {
        $barber = Barber::findOrFail($id);
        return response()->json(['barber' => $barber]);
    }

    public function add(Request $request, $id)
    {
        $barbershop = Barbershop::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'from-to' => 'required|string',
        ]);

        $avatar = $request->input('avatar', '/defaultLogo/defaultLogo.png');

        $barber = $barbershop->barbers()->create([
            'name' => $request->input('name'),
            'from_to' => $request->input('from_to'),
            'avatar' => $avatar,
        ]);

        return response()->json(['message' => 'Barber added successfully', 'barber' => $barber]);
    }

    public function bookings(Request $request, $id) {
        $barber = Barber::findOrFail($id);
        $bookings = $barber->bookings; // Assuming you have defined the relationship in the Barber model
        return response()->json(['bookings' => $bookings]);
    }

    // Add other methods as needed (show, store, update, delete)
}
