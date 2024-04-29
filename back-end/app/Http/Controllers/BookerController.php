<?php

namespace App\Http\Controllers;

use App\Models\Booker;
use Illuminate\Http\Request;

class BookerController extends Controller
{
    public function all()
    {
        $bookers = Booker::all();
        return response()->json(['bookers' => $bookers]);
    }

    public function show($id)
    {
        $booker = Booker::findOrFail($id);
        return response()->json(['booker' => $booker]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'booker_name' => 'required|string',
            'booker_email' => 'required|email|unique:bookers',
            'booker_contact' => 'required|string',
        ]);

        $booker = Booker::create([
            'booker_name' => $request->input('booker_name'),
            'booker_email' => $request->input('booker_email'),
            'booker_contact' => $request->input('booker_contact'),
        ]);

        return response()->json(['message' => 'Booker added successfully', 'booker' => $booker]);
    }

    public function destroy($id)
    {
        $booker = Booker::findOrFail($id);
        $booker->delete();

        return response()->json(['message' => 'Booker deleted successfully']);
    }
}
