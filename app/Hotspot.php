<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hotspot extends Model
{
    protected $fillable = [
        'name',
        'x_axis',
        'y_axis',
        'z_axis',
        'camera_x_axis',
        'camera_y_axis',
        'camera_z_axis',
    ];
}
