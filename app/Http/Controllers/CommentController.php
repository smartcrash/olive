<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentRequest $request)
    {
        $validated = $request->validated();

        $comment = new  Comment();
        $comment->author = $validated['author'];
        $comment->content = $validated['content'];
        $comment->parent_id = $validated['parent_id'];
        $comment->save();
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
        dd($comment->content);
    }
}
