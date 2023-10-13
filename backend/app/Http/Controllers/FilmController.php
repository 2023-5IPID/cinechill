<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class filmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $film = Film::all();

        return view('film.index', [
            'film' => $film,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $film = new Film();

        return view('film.create', [
        'film' => $film,
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $film = new Film();
    
        $film->titre = $request->input('titre');
        $film->realisateur = $request->input('realisateur');
        $film->duree_min = $request->input('duree_min');
        $film->genre = $request->input('genre');
        $film->annee_sortie = $request->input('annee_sortie');
    
        $film->save();
    
        return response()->json([
            'data' => $film,
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $film = Film::findOrFail($id);

        return view('film.show', ['film' => $film,]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $film = Film::findOrFail($id);

        return view('film.edit', ['film' => $film,]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $film = Film::findOrFail($id);
        $film->fill($request->all());
        $film->save();

        return redirect()->route('film.show', $film->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $film = Film::findOrFail($id);
        $film->delete();

        return redirect()->route('film.index');
    }
}