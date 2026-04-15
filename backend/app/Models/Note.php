<?php

namespace App\Models;

use App\Policies\NotePolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UsePolicy(NotePolicy::class)]
class Note extends Model
{
    use HasUuids, HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    public $fillable = [
        'title', 
        'content', 
        'language', 
        'summary', 
        'user_id',
    ];


    // Relationships
    public function user() {
        return $this->belongsTo(User::class);
    }
}
