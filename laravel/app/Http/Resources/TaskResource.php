<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => Carbon::parse($this->created_at)->format('d-m-Y H:i:s'),
            'number_of_likes' => $this->number_of_likes,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->user),
            'state_id' => $this->state_id,
            'state' => new StateResource($this->state),
            'disabled' => false
        ];
    }
}
