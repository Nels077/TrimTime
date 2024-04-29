<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request ;
use App\Models\Barbershop;
use App\Models\Service;
use App\Models\User;

class BarbershopController extends Controller
{
    public function all()
    {
        return Barbershop::all();
    }

    public function show($id)
    {
        $barbershop = Barbershop::findOrFail($id);

        $barbers = $barbershop->barbers()->get();
        $services = Service::whereIn('barber_id', $barbers->pluck('id'))->get();

        return response()->json(['barbershop' => $barbershop, 'barbers' => $barbers, 'services' => $services]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'type' => 'required|in:barbershop,user', // Add type validation
            'name' => 'required|string',
            'login' => 'required|string|unique:barbershops,users', // Validate uniqueness across both tables
            'email' => 'required|email|unique:barbershops,users',
            'contact' => 'required|string',
            'password' => 'required|string',
            'location' => 'nullable|string',
            'logo' => 'nullable|string',
            'from_to' => 'nullable|string',
        ]);

        // Determine the type of registration
        $type = $request->input('type');

        if ($type === 'barbershop') {
            // Barbershop registration
            $barbershop = Barbershop::create([
                'name' => $request->input('name'),
                'login' => $request->input('login'),
                'email' => $request->input('email'),
                'contact' => $request->input('contact'),
                'password' => bcrypt($request->input('password')),
                'location' => $request->input('location'),
                'logo' => $request->input('logo', '/defaultLogo/defaultLogo.png'),
                'from_to' => $request->input('from_to'),
            ]);

            return response()->json(['message' => 'Barbershop registered successfully', 'barbershop' => $barbershop]);
        } elseif ($type === 'user') {
            // User registration
            $user = User::create([
                'name' => $request->input('name'),
                'login' => $request->input('login'),
                'email' => $request->input('email'),
                'contact' => $request->input('contact'),
                'password' => bcrypt($request->input('password')),
                'avatar' => $request->input('avatar', '/defaultAvatar/defaultAvatar.png'),
            ]);

            return response()->json(['message' => 'User registered successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'Invalid registration type'], 400);
        }
    }
}
