<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Barbershop;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $barbershops = Barbershop::search($searchTerm)->get();

        return response()->json(['barbershops' => $barbershops]);
    }
}
