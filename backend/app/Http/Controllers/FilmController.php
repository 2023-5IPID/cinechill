<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use App\Http\Requests\FilmRequest;

class filmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $film = Film::all();

        return response()->json(['film' => $film]);
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
    public function store(FilmRequest $request)
    {
        $request->validate([
            'titre'=>'required',
            'realisateur'=>'required',
            'duree_min'=>'required',
            'genre'=>'required',
            'annee_sortie'=>'required',
        ]);
        
        $film = new Film();
    
        $film->titre = $request->titre;
        $film->realisateur = $request->realisateur;
        $film->duree_min = $request->duree_min;
        $film->genre = $request->genre;
        $film->annee_sortie = $request->annee_sortie;
        
        if (!$film->save()) {
            // En cas d'échec de l'enregistrement, renvoyez les erreurs
            return response()->json(['errors' => $film->getErrors()], 422);
        }

        return response()->json(['success' => 'Le film a été ajouté avec succès.']);
       
        // return response()->json(['data' => $film,]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $film = Film::findOrFail($id);

        return response()->json(['data' => $film,]); // renvois en format Json
        // return view('film.show', ['film' => $film,]); // renvois vers une view 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $film = Film::findOrFail($id);
        return response()->json(['data' => $film,]); // renvois en format Json
        //return view('film.edit', ['film' => $film,]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FilmRequest $request, string $id)
    {
        $request->validate([
            'titre'=>'required',
            'realisateur'=>'required',
            'duree_min'=>'required',
            'genre'=>'required',
            'annee_sortie'=>'required',
        ]);

        $film = Film::findOrFail($id);
    
        $film->titre = $request->input('titre');
        $film->realisateur = $request->input('realisateur');
        $film->duree_min = $request->input('duree_min');
        $film->genre = $request->input('genre');
        $film->annee_sortie = $request->input('annee_sortie');
    
        $film->save();
    
        return response()->json(['les champs ont été ajustés ' => true,]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $film = Film::findOrFail($id);
        $film->delete();

        //return redirect()->route('film.index');
        return response()->json(['le film '. $film->titre.' à été supprimé' => true,]);
    }
}