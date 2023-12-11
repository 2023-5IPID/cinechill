<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function index()
    {
        $reservation = Reservation::with('user', 'filmSalle')->get();
        
        return response()->json(['reservation' => $reservation,]);
    }

    public function show (string $id){

        $reservation = Reservation::findOrFail($id);

        return response()->json(['reservation' => $reservation->load('user', 'filmSalle'),]);
    }

    public function where (string $id){

        $reservations = Reservation::all()->where('user_id', $id);
        $reservations->load('user', 'filmSalle');
        
        foreach ($reservations as $reservation) {
            $reservation->filmSalle->load('film', 'salle'); 
        }
        return response()->json(['reservation' => $reservations,]);;
    }

    public function store (Request $request, string $id){
        
        $reservation = new Reservation();

        $reservation->user_id = $id;
        $reservation->seance_id = $request->seance_id;
        $reservation->nb_places = $request->nb_places;

        if (!$reservation->save()) {
            return response()->json(['errors' => $reservation->getErrors()], 422);
        }

        return response()->json(['reservation' => $reservation->load('user', 'filmSalle'),]);
    }

    public function update (Request $request, string $id){
        
        $reservation = Reservation::findOrFail($id);

        $reservation->user_id = $request->user_id;
        $reservation->seance_id = $request->seance_id;
        $reservation->nb_places = $request->nb_places;

        if (!$reservation->save()) {
            return response()->json(['errors' => $reservation->getErrors()], 422);
        }

        return response()->json(['reservation' => $reservation->load('user', 'filmSalle'),]);
    }

    public function destroy (string $id){

        $reservation = Reservation::findOrFail($id);

        $reservation->delete();

        return 'Séance supprimé';
    }
}
