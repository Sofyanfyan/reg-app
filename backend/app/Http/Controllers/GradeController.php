<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Exception;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function getAll() {
        try {
            //code...

            $data = Grade::orderBy('id', 'asc')->get();

            return response()->json((object) [
                'code' => 200,
                'data' => $data,
            ], 200); 

        } catch (Exception $err) {
           
            return response()->json((object) [
                'code' => 500,
                'msg' => 'Internal server error',
            ], 500); 
        }
    }
}
