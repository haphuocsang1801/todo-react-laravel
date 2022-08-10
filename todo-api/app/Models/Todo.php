<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use PDO;

class Todo extends Model
{
    use HasFactory;
    protected $table='todo';
    public function createTodo(array $attributes){
        $todo  = new self();
        $todo->name= $attributes['name'];
        $todo->completed = $attributes['completed'];
        $todo->priority = $attributes['priority'];
        $todo->author = $attributes['author'];
        $todo->save();
        return $todo;
    }

    public function getTodo($id,$author){
      $todo= $this::where('author',"=",$author);
      $todo = $this::where('id',"=",$id)->first();
      return $todo;
    }

    public function getTodos($id){
      return $this::where('author','=',$id)->get();
    }

    public function updateTodo( $id,array $attributes){
      $todo = $this->getTodo($id,$attributes['author']);
      $todo==null ? throw new ModelNotFoundException("Can't find todo"):
      $todo->name= $attributes['name'];
      $todo->completed = $attributes['completed'];
      $todo->priority = $attributes['priority'];
      $todo->author = $attributes['author'];
      $todo->save();
      return $todo;
    }

    public function deleteTodo(int $id){
      $todo = $this->getTodo($id,"");
      if($todo){
        return $todo -> delete();
      }
      throw new ModelNotFoundException("Todo item not found");
    }
}
