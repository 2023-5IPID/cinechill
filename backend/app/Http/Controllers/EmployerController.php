<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Absence;
use App\Http\Requests\EmployerRequest;
use App\Http\Requests\AbsenceRequest;
use Illuminate\Http\Request;


class EmployerController extends Controller
{
    public function index()
    {
        // Affiche la liste des employeurs
        $employer = Employer::all();
        return response()->json(['employer' => $employer]);
    }

    public function store(EmployerRequest $request)
    {
        // Stocke un nouvel employeur dans la base de données
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tel' => 'required',
            'statut' => 'required',
        ]);

        $employer = new Employer();

        $employer->nom = $request->nom;
        $employer->prenom = $request->prenom;
        $employer->tel = $request->tel ;
        $employer->statut = $request->statut;

        if (!$employer->save()){
            return response()->json(['errors' => $employer->getErrors()], 422);
        }

        return response()->json(['employer' => $employer]);

    }

    public function show(string $id)
    {
        // Affiche les détails d'un employeur spécifique
        $employer = Employer::findOrFail($id);
        return response()->json(['employer' => $employer]);
    }


    public function update(EmployerRequest $request, string $id)
    {
        // Met à jour les informations d'un employeur spécifique
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tel' => 'required',
            'statut' => 'required',
        ]);

        $employer = Employer::findOrFail($id);

        $employer->nom = $request->input('nom');
        $employer->prenom = $request->input('prenom');
        $employer->tel = $request->input('tel');
        $employer->statut = $request->input('statut');

        $employer->save();
        return response()->json(['les champs ont été ajustés' => true,]);
    }

    public function destroy(string $id)
    {
        // Supprime un employeur spécifique de la base de données
        $employer = Employer::findOrFail($id);
        $employer->delete();
        return response()->json(['Employer supprimé' => true]);
    }


        /////////////////////////////////////////////////////////////////////////////////////
       //////////////                                                  /////////////////////
      //////////////                  PARTIE ABSENCE                  /////////////////////
     //////////////                                                  /////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    public function showAbsences(string $employerId)
    {
        // Affiche les absences d'un employeur spécifique
        $employer = Employer::findOrFail($employerId);
        $absences = $employer->absences;
        return response()->json(['absences' => $absences]);
    }

    public function indexAbsence()
    {
        // Affiche les absences 
        $employers = Employer::with('absences')->get();
        
        return response()->json(['absences' => $employers]);
    }

    public function storeAbsence(AbsenceRequest $request, string $employerId)
    {
        // Stocke une nouvelle absence pour un employeur dans la base de données
        $request->validate([
            'date_debut' => 'required',
            'date_fin' => 'required',
            'motif' => 'required',
        ]);

        $employer = Employer::findOrFail($employerId);
        $absence = new Absence([
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
            'motif' => $request->input('motif'),
        ]);

        $employer->absences()->save($absence);

        $employer = Employer::with('absences')->findOrFail($employerId);
        
        return response()->json(['absence' => $employer]);
    }

    public function updateAbsence(AbsenceRequest $request, string $absenceId)
    {
        // Met à jour les informations d'une absence spécifique d'un employeur
        $request->validate([
            'date_debut' => 'required',
            'date_fin' => 'required',
            'motif' => 'required',
        ]);

        $absence = Absence::findOrFail($absenceId);
        $absence->update($request->all());

        return response()->json(['message' => 'Absence mise à jour avec succès']);
    }

    public function destroyAbsence(string $absenceId)
    {
        // Supprime une absence spécifique d'un employeur de la base de données
        $absence = Absence::findOrFail($absenceId);
        $absence->delete();

        return response()->json(['message' => 'Absence supprimée avec succès']);
    }
}
