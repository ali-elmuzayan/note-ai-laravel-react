<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteRequest;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;

class NoteController extends Controller
{

    /**
     * Summary of index
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) {
        // Get all notes of the authenticated user 
        $notes = $request->user()->notes()->latest()->paginate(10); 
        return response()->json($notes);
    }
    

    public function store(NoteRequest $request) {
            $note = $request->user()->notes()->create($request->validated()); 

            return response()->json($note, 201);
    }

    public function show(Request $request, Note $note) {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Note not found'], 403);
        }
        return response()->json($note);
    }

    public function update(NoteRequest $request, Note $note) {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Note not found'], 403);
        }
        $note->update($request->validated());
        return response()->json($note);
    }

    public function destroy(Request $request, Note $note) {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Note not found'], 403);
        }
        $note->delete();
        return response()->json(['message' => 'Note deleted']);
    }


}
