<?php

namespace App\Policies;

use App\Models\Note;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class NotePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Note $note): bool
    {
        return $user->id === $note->user_id;
    }

    /**
     * Any authentiecated user can create a note 
     */
    public function create(User $user): bool
    {
        return true ;
    }

    /**
     * user can update his notes only 
     */
    public function update(User $user, Note $note): bool
    {
        return $user->id === $note->user_id;
    }

    /**
     * user can delete his notes only 
     */
    public function delete(User $user, Note $note): bool
    {
        return $user->id === $note->user_id;
    }


}
