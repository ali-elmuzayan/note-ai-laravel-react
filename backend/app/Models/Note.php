<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasUuids;

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
