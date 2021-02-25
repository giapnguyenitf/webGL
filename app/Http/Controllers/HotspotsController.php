<?php

namespace App\Http\Controllers;

use App\Hotspot;
use App\Http\Requests\Hotspot\CreateHotspotRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

class HotspotsController extends Controller
{
    public function create() :View
    {
        return view('add-hotspot');
    }

    public function store(CreateHotspotRequest $request)
    {
        Hotspot::create($request->validated());

        return redirect()->route('hotspots.create');
    }
}
