<?php

namespace App\Repositories;

use App\Interfaces\CommentRepositoryInterface;
use App\Models\Comment;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Collection;

class CommentRepository implements CommentRepositoryInterface
{
    public function all($limit = 5): CursorPaginator
    {
        return Comment::whereNull('parent_id')
            ->withCount('children')
            ->orderBy('created_at', 'DESC')
            ->cursorPaginate($limit);
    }

    public function create(array $attributes): Comment
    {
        $comment = new  Comment($attributes);

        if (array_key_exists('parent_id', $attributes) && is_numeric($attributes['parent_id'])) {
            $parent = Comment::findOrFail($attributes['parent_id']);
            $comment->depth = $parent->depth + 1;
        }

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
