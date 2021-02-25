<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class LiveVideoController extends Controller
{
    public function index()
    {
        return view('video-live.user');
    }

    public function edit()
    {
        return view('video-live.admin');
    }

    public function show()
    {
        return view('video-live.show');
    }
}
