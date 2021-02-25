<?php

namespace App\Http\Controllers;

use App\Hotspot;
use App\Http\Requests\UploadObject3DRequest;
use App\Object3D;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index() :View
    {
        $object3Ds = Object3D::all();
        $hotspots = Hotspot::all();

        return view('admin', compact('object3Ds', 'hotspots'));
    }

    public function showImport() :View
    {
        return view('import');
    }

    public function import(UploadObject3DRequest $request)
    {
        $file = $request->file('object_3d');
        $path = Storage::disk('public_uploads')->putFileAs('/uploads', $file, time() . '_' .$file->getClientOriginalName());
        $object3D = Object3D::create([
            'name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientOriginalExtension(),
            'path' => $path,
            'x_axis' => $request->get('x_axis'),
            'y_axis' => $request->get('y_axis'),
            'z_axis' => $request->get('z_axis'),
        ]);

        return redirect()->back();
    }

    public function mapOrbit()
    {
        return view('map-orbit');
    }
}
