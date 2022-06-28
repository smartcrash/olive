<?php

namespace App\Interfaces;

use App\Models\Comment;
use Illuminate\Support\Collection;

interface CommentRepositoryInterface
{
    /**
     * Returns all level 1 comments
     */
    public function all(): Collection;

    /**
     * Create comment and save it to the database
     */
    public function create(array $attributes): Comment;

    /**
     * Get the children (replies) of an specific comment
     */
    public function children(int $id): Collection;
}
