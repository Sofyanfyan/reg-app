<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Father extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'id',
        'user_id',
        'name',
        'place_birth',
        'religion',
        'date_birth',
        'occupation',
        'company_name',
        'company_address',
        'home_address',
        'telephone',
        'mobilephone',
        'id_or_passport',
        'nationality',
        'phone',
        'email',
    ];
}
