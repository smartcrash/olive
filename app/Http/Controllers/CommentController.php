<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Interfaces\CommentRepositoryInterface;

class CommentController extends Controller
{
    private CommentRepositoryInterface $commentRepository;

    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentRequest $request)
    {
        $attributes = $request->validated();
        $this->commentRepository->create($attributes);
    }


    /**
     * Returns a listing of the children of an specific Comment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function children(Request $request, Comment $comment)
    {
        return $this->commentRepository->children($comment->id);
    }
}
