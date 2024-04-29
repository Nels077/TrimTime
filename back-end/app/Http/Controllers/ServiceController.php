<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function all()
    {
        $services = Service::all();
        return response()->json(['services' => $services]);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json(['service' => $service]);
    }

    public function add(Request $request, $id)
    {
        $barbershop = Barbershop::findOrFail($id);

        $request->validate([
            'barber_id' => 'required|int',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'longevity' => 'required|string',
        ]);

        $service = $barbershop->services()->create([
            'barber_id' => $request->input('barber_id'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'longevity' => $request->input('longevity'),
        ]);

        return response()->json(['message' => 'Service added successfully', 'service' => $service]);
    }
    // Add other methods as needed (show, store, update, delete)
}
