<?php

namespace App\Http\Controllers;

use App\Hotspot;
use App\Object3D;
use Illuminate\Http\Request;
use Illuminate\View\View;

class UsersController extends Controller
{
    public function index() : View
    {
        $object3Ds = Object3D::all();
        $hotspots = Hotspot::all();

        return view('user', compact('object3Ds', 'hotspots'));
    }
}
