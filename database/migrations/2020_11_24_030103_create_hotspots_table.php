<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotspotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotspots', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->float('x_axis')->default(0);
            $table->float('y_axis')->default(0);
            $table->float('z_axis')->default(0);
            $table->float('camera_x_axis')->default(0);
            $table->float('camera_y_axis')->default(0);
            $table->float('camera_z_axis')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hotspots');
    }
}
