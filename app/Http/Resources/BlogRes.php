<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogRes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
              "user_id" => $this->user_id,
              "description" => $this->description,
              "image" => !str_contains( $this->image, "https") ? asset("images/".$this->image) : $this->image,
                "title" => $this->title,
                "content" => $this->content,
                "created_at" => $this->created_at,
                "updated_at" => $this->updated_at,
          ];
    }
}
