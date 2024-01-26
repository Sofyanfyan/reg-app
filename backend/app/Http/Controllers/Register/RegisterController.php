<?php

namespace App\Http\Controllers\Register;

use App\Http\Controllers\Controller;
use App\Models\BrotherSister;
use App\Models\Father;
use App\Models\Mother;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function checkFieldStudent(Request $request) {

        try {

            $user = auth()->guard('api')->user();

            $rules = [
                'name' => $request->name,
                'id_or_passport' => $request->id_or_passport,
                'gender' => $request->gender,
                'religion' => $request->religion,
                'grade_id' => $request->grade_id,
                'nationality' => $request->nationality,
                'place_birth' => $request->place_birth,
                'date_birth' => $request->date_birth,
                'place_of_issue' => $request->place_of_issue,
                'date_exp' => $request->date_exp,
                'user_id' => $user->id,
            ];


            $validator = Validator::make($rules, [
                'name' => 'required|string|min:3',
                'id_or_passport' => 'nullable|string|min:9|max:16|unique:students',
                'gender' => 'required|string|in:Male,Female',
                'religion' => 'required|string',
                'grade_id' => 'required|integer',
                'nationality' => 'required|string|min:3',
                'place_birth' => 'required|string',
                'date_birth' => 'required|date',
                'place_of_issue' => 'nullable|string',
                'date_exp' => 'nullable|date',
                'user_id' => 'required|integer',
             ]);

             if($validator->fails()) {
                
                return response()->json((object)[
                    'code' => 400,
                    'msg' => $validator->errors()
                ], 400);

             }


             return response()->json([
                'code' => 200,
                'data' => $rules,
             ], 200);
            
        } catch (Exception $err) {
            
            return response()->json((object) [
                'code' => 500,
                'msg' => "Internal server error",
            ], 500);

        }
    }

    public function checkFieldParent(Request $request) {
        try {
            
            $user = auth()->guard('api')->user();

            $rules = [
                'relation' => $request->relation,
                'user_id' => $user->id,
                'name'=> $request->name,
                'place_birth' => $request->place_birth,
                'religion' => $request->religion,
                'date_birth' => $request->date_birth,
                'occupation' => $request->occupation,
                'company_name' => $request->company_name,
                'company_address' => $request->company_name,
                'home_address' => $request->home_address,
                'telephone' => $request->telephone,
                'mobilephone' => $request->mobilephone,
                'id_or_passport' => $request->id_or_passport,
                'nationality' => $request->nationality,
                'phone' => $request->phone,
                'email' => $request->email,
            ];

            $validator = Validator::make($rules, [
                'relation' => 'required|string|in:father,mother',
                'name' => 'required|string|min:3',
                'religion' => 'required|string',
                'place_birth' => 'required|string',
                'date_birth' => 'required|date',
                'id_or_passport' => 'required|string|min:15|max:16',
                'nationality' => 'required|string',
                'occupation' => 'nullable|string',
                'company_name' => 'nullable|string',
                'company_address' => 'nullable|string',
                'phone' => 'nullable|string|max:15|min:6',
                'home_address' => 'required|string',
                'telephone' => 'nullable|string|max:15|min:6',
                'mobilephone' => 'required|string|max:15|min:6',
                'email' => 'required|string|email',
            ]);

            if($validator->fails()){
                return response()->json((object)[
                    'code' => 400,
                    'msg' => $validator->errors()
                ], 400);
            }

            return response()->json([
                'code' => 200,
                'data' => $rules,
             ], 200);



        } catch (Exception $err) {
            return response()->json((object) [
                'code' => 500,
                'msg' => "Internal server error",
            ], 500);
        }
    }


    public function register(Request $request) {

        DB::beginTransaction();
        try {

            $user = auth()->guard('api')->user();
            
            $credential_father = [
                'user_id' => $user->id,
                'name'=> $request->fatherName,
                'place_birth' => $request->fatherPlace_birth,
                'religion' => $request->fatherReligion,
                'date_birth' => $request->fatherBirth_date,
                'occupation' => $request->fatherOccupation,
                'company_name' => $request->fatherCompany_name,
                'company_address' => $request->fatherCompany_address,
                'home_address' => $request->fatherHome_address,
                'telephone' => $request->fatherTelephone,
                'mobilephone' => $request->fatherMobilephone,
                'id_or_passport' => $request->fatherId_or_passport,
                'nationality' => $request->fatherNationality,
                'phone' => $request->fatherCompany_phone,
                'email' => $request->fatherEmail,
            ];
            
            $credential_mother = [
                'user_id' => $user->id,
                'name'=> $request->motherName,
                'place_birth' => $request->motherPlace_birth,
                'religion' => $request->motherReligion,
                'date_birth' => $request->motherBirth_date,
                'occupation' => $request->motherOccupation,
                'company_name' => $request->motherCompany_name,
                'company_address' => $request->motherCompany_address,
                'home_address' => $request->motherHome_address,
                'telephone' => $request->motherTelephone,
                'mobilephone' => $request->motherMobilephone,
                'id_or_passport' => $request->motherId_or_passport,
                'nationality' => $request->motherNationality,
                'phone' => $request->motherCompany_phone,
                'email' => $request->motherEmail,
            ];
            
            $rules = [
            'name' => $request->studentName,
            'grade_id' => $request->gradeId,
            'gender' => $request->studentGender,
            'religion' => $request->studentReligion,
            'place_birth' => $request->studentPlace_birth,
            'date_birth' => $request->studentDate_birth,
            'id_or_passport' => $request->studentId_or_passport,
            'nationality' => $request->studentNationality,
            'place_of_issue' => $request->studentPlace_of_issue,
            'date_exp' => $request->studentDate_exp,
            // Father rules
            'father_relation' => 'father',
            'father_name' => $request->fatherName,
            'father_religion' => $request->fatherReligion,
            'father_place_birth' => $request->fatherPlace_birth,
            'father_date_birth' => $request->fatherBirth_date,
            'father_id_or_passport' => $request->fatherId_or_passport,
            'father_nationality' => $request->fatherNationality,
            'father_occupation' => $request->fatherOccupation,
            'father_company_name' => $request->fatherCompany_name,
            'father_company_address' => $request->fatherCompany_address,
            'father_phone' => $request->fatherCompany_phone,
            'father_home_address' => $request->fatherHome_address,
            'father_telephone' => $request->fatherTelephone,
            'father_mobilephone' => $request->fatherMobilephone,
            'father_email' => $request->fatherEmail,
            // Mother rules
            'mother_relation' => 'mother',
            'mother_name' => $request->motherName,
            'mother_religion' => $request->motherReligion,
            'mother_place_birth' => $request->motherPlace_birth,
            'mother_date_birth' => $request->motherBirth_date,
            'mother_id_or_passport' => $request->motherId_or_passport,
            'mother_nationality' => $request->motherNationality,
            'mother_occupation' => $request->motherOccupation,
            'mother_company_name' => $request->motherCompany_name,
            'mother_company_address' => $request->motherCompany_address,
            'mother_phone' => $request->motherCompany_phone,
            'mother_home_address' => $request->motherHome_address,
            'mother_telephone' => $request->motherTelephhone,
            'mother_mobilephone' => $request->motherMobilephone,
            'mother_email' => $request->motherEmail,
            
            //brother and sister
            
            'brotherOrSisterName1' => $request->brotherOrSisterName1, 
            'brotherOrSisterBirth_date1' => $request->brotherOrSisterBirth_date1,
            'brotherOrSisterGrade1' => $request->brotherOrSisterGrade1,
            'brotherOrSisterName2' => $request->brotherOrSisterName2, 
            'brotherOrSisterBirth_date2' => $request->brotherOrSisterBirth_date2,
            'brotherOrSisterGrade2' => $request->brotherOrSisterGrade2,
            'brotherOrSisterName3' => $request->brotherOrSisterName3, 
            'brotherOrSisterBirth_date3' => $request->brotherOrSisterBirth_date3,
            'brotherOrSisterGrade3' => $request->brotherOrSisterGrade3,
            'brotherOrSisterName4' => $request->brotherOrSisterName4, 
            'brotherOrSisterBirth_date4' => $request->brotherOrSisterBirth_date4,
            'brotherOrSisterGrade4' => $request->brotherOrSisterGrade4,
            'brotherOrSisterName5' => $request->brotherOrSisterName5, 
            'brotherOrSisterBirth_date5' => $request->brotherOrSisterBirth_date5,
            'brotherOrSisterGrade5' => $request->brotherOrSisterGrade5,
            
        ];
        
        
        $validator = Validator::make($rules, [
            'name' => 'required|string|min:3',
            'grade_id' => 'required|integer',
            'gender' => 'required|string',
            'religion' => 'required|string',
            'nisn' => 'nullable|string|min:7|max:12|unique:students',
            'place_birth' => 'required|string',
            'date_birth' => 'required|date',
            'id_or_passport' => 'nullable|string|min:5|max:16|unique:students',
            'nationality' => 'required|string|min:3',
                'place_of_issue' => 'nullable|string',
                'date_exp' => 'nullable|date',
                // father validation 
                'father_name' => 'string|required|min:3',
                'father_religion' => 'required|string',
                'father_place_birth' => 'required|string',
                'father_date_birth' => 'required|date',
                'father_id_or_passport' => 'required|string|min:5|max:16',
                'father_nationality' => 'required|string',
                'father_phone' => 'nullable|string|max:15|min:6',
                'father_home_address' => 'required|string',
                'father_mobilephone' => 'required|string|max:15|min:6',
                'father_telephone' => 'nullable|string|max:15|min:6',
                'father_email' => 'required|string|email',
                //mother validation
                'mother_name' => 'required|string|min:3',
                'mother_religion' => 'required|string',
                'mother_place_birth' => 'required|string',
                'mother_date_birth' => 'required|date',
                'mother_id_or_passport' => 'required|string|min:5|max:16',
                'mother_nationality' => 'required|string',
                'mother_occupation' => 'nullable|string',
                'mother_company_name' => 'nullable|string',
                'mother_company_address' => 'nullable|string',
                'mother_phone' => 'nullable|string|max:15|min:6',
                'mother_home_address' => 'required|string',
                'mother_telephone' => 'nullable|string|max:15|min:6',
                'mother_mobilephone' => 'required|string|max:15|min:6',
                'mother_telephone' => 'nullable|string|max:15|min:6',
                'mother_email' => 'required|string|email',
                
                'brotherOrSisterName1' => 'nullable|string',
                'brotherOrSisterBirth_date1' => 'nullable|date',
                'brotherOrSisterGrade1' => 'nullable|string',
                'brotherOrSisterName2' =>  'nullable|string',
                'brotherOrSisterBirth_date2'=>'nullable|date',
                'brotherOrSisterGrade2' => 'nullable|string',
                'brotherOrSisterName3' =>  'nullable|string',
                'brotherOrSisterBirth_date3'=>'nullable|date',
                'brotherOrSisterGrade3' => 'nullable|string',
                'brotherOrSisterName4' =>  'nullable|string',
                'brotherOrSisterBirth_date4'=>'nullable|date',
                'brotherOrSisterGrade4' => 'nullable|string',
                'brotherOrSisterName5' =>  'nullable|string',
                'brotherOrSisterBirth_date5'=>'nullable|date',
                'brotherOrSisterGrade5' => 'nullable|string',
            ]);
            
            
            if($validator->fails()){
                return response()->json((object)[
                    'code' => 400,
                    'msg' => $validator->errors()
                ], 400);
            }
            $mother = Mother::create($credential_mother);
            $father = Father::create($credential_father);
            

            $credential_student = [
                'name' => $request->studentName,
                'grade_id' => (int)$request->gradeId,
                'gender' => $request->studentGender,
                'religion' => $request->studentReligion,
                'place_birth' => $request->studentPlace_birth,
                'date_birth' => $request->studentDate_birth,
                'id_or_passport' => $request->studentId_or_passport,
                'nationality' => $request->studentNationality,
                'place_of_issue' => $request->studentPlace_of_issue,
                'date_exp' => $request->studentDate_exp,
                'user_id' => $user->id,
                'father_id' => $father->id,
                'mother_id' => $mother->id,
            ];
        
            $student = Student::create($credential_student);
            $this->handleBrotherOrSister($request, $student);
            
            return response()->json((object) [
                'code' => 201,
                'data' => $student,
            ],201);


        } catch (Exception $err) {
            DB::rollBack();
            return response()->json((object) [
                'code' => 500,
                'msg' => $err,
            ], 200);
        }
    }

    private function handleBrotherOrSister($request, $student)
   {
      
      try {
         //code...
         $credentialsBrotherOrSister = [];

         if($request->brotherOrSisterName1 && $request->brotherOrSisterBirth_date1 && $request->brotherOrSisterGrade1)
         {
            array_push($credentialsBrotherOrSister, (array)['name' => $request->brotherOrSisterName1, 'date_birth' => $request->brotherOrSisterBirth_date1, 'grade' => $request->brotherOrSisterGrade1, 'student_id' => $student->id]);
         }
         if($request->brotherOrSisterName2 && $request->brotherOrSisterBirth_date2 && $request->brotherOrSisterGrade2)
         {
            array_push($credentialsBrotherOrSister, (array)['name' => $request->brotherOrSisterName2, 'date_birth' => $request->brotherOrSisterBirth_date2, 'grade' => $request->brotherOrSisterGrade2, 'student_id' => $student->id]);
         }
         if($request->brotherOrSisterName3 && $request->brotherOrSisterBirth_date3 && $request->brotherOrSisterGrade3)
         {
            array_push($credentialsBrotherOrSister, (array)['name' => $request->brotherOrSisterName3, 'date_birth' => $request->brotherOrSisterBirth_date3, 'grade' => $request->brotherOrSisterGrade3, 'student_id' => $student->id]);
         }
         if($request->brotherOrSisterName4 && $request->brotherOrSisterBirth_date4 && $request->brotherOrSisterGrade4)
         {
            array_push($credentialsBrotherOrSister, (array)['name' => $request->brotherOrSisterName4, 'date_birth' => $request->brotherOrSisterBirth_date4, 'grade' => $request->brotherOrSisterGrade4, 'student_id' => $student->id]);
         }
         if($request->brotherOrSisterName5 && $request->brotherOrSisterBirth_date5 && $request->brotherOrSisterGrade5)
         {
            array_push($credentialsBrotherOrSister, (array)['name' => $request->brotherOrSisterName5, 'date_birth' => $request->brotherOrSisterBirth_date5, 'grade' => $request->brotherOrSisterGrade5, 'student_id' => $student->id]);
         }

         BrotherSister::insert($credentialsBrotherOrSister);
         

         return (object)['success' => true, 'dataBrotherOrSister' => $credentialsBrotherOrSister];
      } catch (Exception $err) {
         return (object)['success' => false, 'error' => $err];
      }
   }

}
