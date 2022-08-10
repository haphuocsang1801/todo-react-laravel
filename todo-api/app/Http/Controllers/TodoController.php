<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    protected $todo;

    public function __construct(Todo $todo)
    {
      $this->todo = $todo;
    }

    public function store(Request $request){
      $request->validate([
        'name'=>"required",
        'completed'=>"required",
        'priority'=>"required",
        'author'=>"required",
      ]);
        $todo = $this->todo->createTodo($request->all());
        return response()->json($request);
    }

    public function update($id,Request $request){
      try {
        $todo = $this->todo->updateTodo($id,$request->all());
        return response()->json($todo);
      } catch (ModelNotFoundException $th) {
        return response()->json(["message"=> $th->getMessage()],404);
      }
    }
    public function get($id,Request $request){
      $todo = $this -> todo ->getTodo($id,$request->all());
      if($todo){
        return response()->json($todo);
      }
      return response()->json(['message'=>"Todo item not found"],404);
    }

    public function gets($id){
      $todo = $this -> todo ->getTodos($id);
      if($todo){
        return response()->json(['todos'=>$todo]);
      }
      return response()->json(['message'=>"Todo item not found"],404);
    }
    public function delete($id){
      $todo = Todo::destroy($id);
      if($todo){
        return response()->json(['message'=>"Delete successfull by {$id}","id"=>$id],200);
      }
      return response()->json(['message'=>"Todo item not found"],404);
    }
    public function search(Request $request){
      $attributes = $request ->all();
      $name= $$attributes['search'];
      $status= $$attributes['status'];
      $priority= $$attributes['priority'];
      return response()->json(["data"=>[$name,$status,$priority]]);
    }
}
