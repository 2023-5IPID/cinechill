<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salle;

class SalleController extends Controller
{
    public function insert(Request $request)
    {
        $items= new Salle();
        $items->nom = $request->nom;
        $items->places = $request->places;
        $items->notes = $request->notes;

        $items->save();
        return response()->json('Added');
    }

    public function edit(Request $request){
        $items=Salle::findorfail($request->id);

        $items->nom = $request->nom;
        $items->places = $request->places;
        $items->notes = $request->notes;

        $items->update();
        return response()->json('Modified');
    }

    public function delete(Request $request){
        $items=Salle::findorfail($request->id)->delete();

        return response()->json('Deleted');
    }

    public function select(){
        $items=Salle::all();

        return response()->json($items);
    }
}
