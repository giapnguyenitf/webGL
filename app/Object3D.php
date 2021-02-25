<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Object3D extends Model
{
    protected $table = 'object_3ds';

    protected $fillable = [
        'name',
        'x_axis',
        'y_axis',
        'z_axis',
        'mime_type',
        'path'
    ];
}
