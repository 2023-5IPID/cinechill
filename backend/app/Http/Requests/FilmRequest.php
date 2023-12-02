<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilmRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre'=> 'required|string|max:255',
            'resume'=> 'required|string|max:65535',
            'duree_min'=> 'required|numeric',
            'genre'=> 'required|string|max:255',
            'annee_sortie'=> 'required|date',
            'poster_path'=> 'required|string|max:255',
        ];
    }
}
