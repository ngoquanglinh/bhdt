<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class BlogController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;
            $Posts = Blog::orderBy('id','desc')
            ->with('user')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
        
        $total = Blog::get();
        return $this->sendResponse(
            $data = [
                     'items' => $Posts , 
                     'total' => $total->count()
                    ]
          );
    }

    public function search(Request $request){
        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;
        $query = Blog::query();
        $searchKey = $request->query('q');

        if($searchKey != null){

            $query = $query->join('users','blogs.user_id','=','users.id')
                           ->join('profiles','profiles.user_id','=','users.id')
                           ->where('profiles.name','like','%'.$searchKey.'%')
                           ->orWhere('blogs.tite','like','%'.$searchKey.'%')
                           ->orWhere('profiles.phone','like','%'.$searchKey.'%');
        }

        $Blog = $query
        ->orderBy('blogs.id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();
        
        $total = Blog::get();
        return $this->sendResponse(
            $data = [
                     'items' => $Blog , 
                     'total' => $Blog->count()
                    ]
          );
    }
      public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'image' => 'required',
            'title' => 'required',
            'disception' => 'required',
            'content' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        
            $blog = new Blog();
            $blog->title = $request->title;
            $blog->image = $request->image;
            $blog->disception = $request->disception;
            $blog->content = $request->content;
            $blog->like = 0;
            $blog->user_id = $request->user()->id;
            $blog->save();
  

        return $this->sendResponse(
            $data = $blog,
            'Create blog successfully.'
        );

    }
    
    public function delete($id,Request $request){

        $found = Blog::find($id); 

        if($found == null){
            
            return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Shop successfully'
          );
    }
        public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'title' => 'required',
            'disception' => 'required',
            'content' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $blog = Blog::find($id);
        
        if($blog != null){

            $blog->title = $request->title;
            $blog->image = $request->image; 
            $blog->disception = $request->disception;
            $blog->content = $request->content;
            $blog->like = $blog->like;
            $blog->user_id = $request->user()->id;
            $blog->save();

            return $this->sendResponse(
                $data = $blog,
                'Update blog successfully.'
            );
        }

        return $this->sendError('blog Errors.',['error' => 'Blog not found !']);
    }

    public function recent(Request $request){

        $blogs = Blog::orderBy('id','desc')
        ->skip(0)
        ->with('user')
        ->take(6)
        ->get();

        return $this->sendResponse(
                $data = $blogs,
                'Get list blog successfully'
            );
        }
        
    public function show($id){
        $found = Blog::where('id', $id)
                        ->with('user')
                        ->first();

        if($found == null){
            
            return $this->sendError('Blog  Errors.',['error' => 'Blog not found !']);
        }

        return $this->sendResponse(
            $data = $found
        );

    }
}
