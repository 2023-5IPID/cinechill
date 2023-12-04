<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;
use App\Models\Salle;
use App\Models\FilmSalle;
use App\Http\Requests\FilmRequest;
use App\Http\Requests\SalleRequest;

class SeanceController extends Controller
{

    public function index()
    {
        $seance = FilmSalle::with('film', 'salle')->get();
        
        return response()->json(['seance' => $seance,]);
    }

    public function show (string $id){

        $seance = FilmSalle::findOrFail($id);

        return response()->json(['seance' => $seance->load('film', 'salle'),]);
    }

    public function store (Request $request){

        $datetimeString = $request->horraire;
        $dateTime = new \DateTime($datetimeString);
        $request->horraire = $dateTime->format('Y-m-d H:i');
        
        $seance = new FilmSalle();

        $seance->film_id = $request->film_id;
        $seance->salle_id = $request->salle_id;
        $seance->horraire = $request->horraire;

        if (!$seance->save()) {
            return response()->json(['errors' => $seance->getErrors()], 422);
        }

        return response()->json(['seance' => $seance->load('film', 'salle'),]);
    }

    public function update (Request $request, string $id){
        $request->validate([
            'film_id'=>'required',
            'salle_id'=>'required',
            'horraire'=>'required|date_format:Y-m-d H:i:s',
        ]);
        $seance = FilmSalle::findOrFail($id);

        $seance->film_id = $request->film_id;
        $seance->salle_id = $request->salle_id;
        $seance->horraire = $request->horraire;

        if (!$seance->save()) {
            return response()->json(['errors' => $seance->getErrors()], 422);
        }

        return response()->json(['seance' => $seance->load('film', 'salle'),]);
    }

    public function destroy (string $id){

        $seance = FilmSalle::findOrFail($id);

        $seance->delete();

        return 'Séance supprimé';
    }
}
