<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): TaskCollection
    {
        if ($request->has('filter')) {

            $query = Task::query();

            if (isset($request->input('filter')['title'])) {
                $query->where('title', 'like', '%' . $request->input('filter')['title'] . '%');
            }

            if (isset($request->input('filter')['state'])) {
                $states = explode(',', $request->input('filter')['state']);
                $query->orWhereIn('state_id', $states);
            }

            return new TaskCollection($query->get());
        } else {
            return new TaskCollection(Task::all());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = new Task([
            "title" => $request->input('title'),
            "description" => $request->input('description'),
            "created_at" => $request->input('created_at'),
            "state_id" => $request->input('state_id'),
            "user_id" => $request->input('user_id'),
        ]);
        $task->save();

        return response()->json(['message' => 'Task created successfully.', 'task' => $task], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): TaskResource
    {
        return new TaskResource ($task);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): TaskResource
    {
        if ($request->has('number_of_likes')) {
            $task->number_of_likes = $request->input('number_of_likes');
        } else {
            $task->number_of_likes = $task->number_of_likes + 1;
        }
        $task->save();
        return new TaskResource ($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        if ($task->number_of_likes > 0) {
            return response()->json(['message' => 'It cannot be deleted because it has likes'], 404);
        }
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
