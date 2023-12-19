<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;

class StudentContoller extends Controller
{

    public function index()
    {
        try {
    
            $user = auth()->guard('api')->user();
            $data = Student::where('user_id', $user->id)->get();

            return response()->json([
                'code' => 200,
                'data' => $data,
            ], 200);
    
        } catch (Exception $err) {
            return $err;
            return response()->json([
                "code" => 500, 
                "msg" => "Internal server error",
            ], 500);
        }
    }
}
