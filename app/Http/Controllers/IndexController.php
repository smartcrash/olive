<?php

namespace App\Http\Controllers;

use App\Interfaces\CommentRepositoryInterface;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    private CommentRepositoryInterface $commentRepository;

    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $comments = $this->commentRepository->all();

        return inertia('index', compact('comments'));
    }
}
