<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salle;
use App\Http\Requests\SalleRequest;

class SalleController extends Controller
{
    public function index(){
        $salle=Salle::all();

        return response()->json(['salles' => $salle]);
    }

    public function show(string $id)
    {
        $salle = Salle::findOrFail($id);

        return response()->json(['data' => $salle,]); 
    }

    public function store(SalleRequest $request)
    {
        $request->validate([
            'nom'=>'required',
            'places'=>'required',
            'notes'=>'required',
        ]);

        $salle= new Salle();
        $salle->nom = $request->nom;
        $salle->places = $request->places;
        $salle->notes = $request->notes;

        $salle->save();
        return response()->json('Added');
    }

    public function edit(string $id)
    {
        $salle = Salle::findOrFail($id);
        return response()->json(['data' => $salle,]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SalleRequest $request, string $id)
    {
        $request->validate([
            'nom'=>'required',
            'places'=>'required',
            'notes'=>'required',
        ]);

        $salle = Salle::findOrFail($id);
    
        $salle->nom = $request->input('nom');
        $salle->places = $request->input('places');
        $salle->notes = $request->input('notes');
    
        $salle->save();
    
        return response()->json(['les champs ont été ajustés ' => true,]);
    }

    public function destroy(string $id){
        $salle = Salle::findorfail($id)->delete();

        return response()->json(['la salle à été supprimé' => true,]);
    }
}
