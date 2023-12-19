<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'grade_id',
        'father_id',
        'mother_id',
        'is_active',
        'unique_id',
        'name',
        'gender',
        'religion',
        'place_birth',
        'date_birth',
        'id_or_passport',
        'nationality',
        'place_of_issue',
        'date_exp',
    ];
}
