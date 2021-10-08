<?php

namespace App\Http\Controllers\Upload;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use App\Document;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Support\Str;

class UploadController extends BaseController
{
    public function store(Request $request)
    {

    //    $validator = Validator::make($request->all(), 
    //           [ 
    //           'files' => 'required|mimes:doc,docx,pdf,txt,jpg,png,jpeg|max:2048',
    //          ]);   

    //  	if ($validator->fails()) {          
    //         return response()->json(['error'=>$validator->errors()], 401);                        
    //     }  
        $success = array();
        $images = $request -> file("files");
        foreach( $images as $image){
            $path = $request->any;
            $file = $image->store($path);
            $urlFile = Storage::url($file);
            array_push($success,$urlFile); 
        }
        return $this->sendResponse($success,'Upload file successfully');
    }
}