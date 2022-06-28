<?php

namespace App\Repositories;

use App\Interfaces\CommentRepositoryInterface;
use App\Models\Comment;
use Illuminate\Support\Collection;

class CommentRepository implements CommentRepositoryInterface
{
    public function all(): Collection
    {
        return Comment::whereNull('parent_id')
            ->withCount('children')
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    public function create(array $attributes): Comment
    {
        $comment = new  Comment($attributes);
        $comment->save();

        return $comment;
    }

    public function children(int $id): Collection
    {
        return Comment::where('parent_id', $id)
            ->withCount('children')
            ->orderBy('created_at', 'DESC')
            ->get();
    }
}
