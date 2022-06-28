<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $comments = Comment::whereNull('parent_id') // Only get level 1 comments
            ->withCount('children')                 // Count the childre so on UI we know if show load more
            ->orderBy('created_at', 'DESC')
            ->get();

        return inertia('index', compact('comments'));
    }
}
