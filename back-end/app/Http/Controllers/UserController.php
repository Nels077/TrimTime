<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function loginUser(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['login' => $request->input('login'), 'password' => $request->input('password')])) {
            // Authentication passed...
            $user = Auth::user();
            return response()->json(['message' => 'User logged in successfully', 'user' => $user]);
        }

        return response()->json(['message' => 'Login failed. Please check your credentials.'], 401);
    }

    public function getUserInfo(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'contact' => $user->contact,
        ]);
    }

    public function registerUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'login' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'contact' => 'required|string',
            'password' => 'required|string',
            'avatar' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'login' => $request->input('login'),
            'email' => $request->input('email'),
            'contact' => $request->input('contact'),
            'password' => bcrypt($request->input('password')),
            'avatar' => $request->input('avatar', '/defaultAvatar/defaultAvatar.png'), // Default avatar path
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user]);
    }
}
