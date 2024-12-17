<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            "name" => $this->name,
              "description" => $this->description ? $this->description : "No description",
              "price" => $this->price . " $",
              "quantity" => $this->stock ,
              "image" => !str_contains( $this->image, "https") ? asset("images/".$this->image) : $this->image,
          ];
    }
}
