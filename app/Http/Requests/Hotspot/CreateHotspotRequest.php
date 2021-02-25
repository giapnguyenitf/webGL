<?php

namespace App\Http\Requests\Hotspot;

use Illuminate\Foundation\Http\FormRequest;

class CreateHotspotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'x_axis' => [
                'required',
                'numeric',
            ],
            'y_axis' => [
                'required',
                'numeric',
            ],
            'z_axis' => [
                'required',
                'numeric',
            ],
            'camera_x_axis' => [
                'required',
                'numeric',
            ],
            'camera_y_axis' => [
                'required',
                'numeric',
            ],
            'camera_z_axis' => [
                'required',
                'numeric',
            ],
        ];
    }
}
