<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteRequest;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller
{

    /**
     * Get all notes of the authenticated user 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) {
        // Get all notes of the authenticated user 
        $notes = $request->user()->notes()->latest()->paginate(10); 

        // check the length if less than 1 return no notes yet 
        if ($notes->count() < 1) return response()->json("no notes yet"); 


        return response()->json($notes);
    }
    

    /**
     * Store the new note 
     * @param NoteRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(NoteRequest $request) {
        $note = $request->user()->notes()->create($request->validated()); 

        return response()->json($note, 201);
    }

    /**
     * Get the note by id 
     * @param Request $request
     * @param Note $note
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, Note $note) {
        // authorize the user to view the note 
        if ($request->user()->cannot('view', $note)) {
           return response()->json('Not authorized',403);
        }

        return response()->json($note);
    }

    /**
     * Update the note 
     * @param NoteRequest $request
     * @param Note $note
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(NoteRequest $request, Note $note) {
        // authorization 
        if ($request->user()->cannot('update', $note)) {
           return response()->json('Not authorized',403);
        }


        $note->update($request->validated());

        return response()->json($note);
    }

    /**
     * Delete the note 
     * @param Request $request
     * @param Note $note
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, Note $note) {
        // authorization 
        if ($request->user()->cannot('delete', $note)) {
           return response()->json('Not authorized',403);
        }

        $note->delete();
        
        return response()->json(['message' => 'Note deleted']);
    }


}
