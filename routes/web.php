<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home.index');
Route::get('/users', 'UsersController@index')->name('users.index');
Route::get('/import', 'HomeController@showImport')->name('home.import.show');
Route::post('/import', 'HomeController@import')->name('home.import');
Route::get('/hotspots', 'HotspotsController@create')->name('hotspots.create');
Route::post('/hotspots', 'HotspotsController@store')->name('hotspots.store');
Route::get('/live-video', 'LiveVideoController@index')->name('live-video.index');
Route::get('/admin/live-video', 'LiveVideoController@edit')->name('live-video.edit');
Route::get('/preview', 'LiveVideoController@show')->name('live-video.show');
Route::get('/map-orbit', 'HomeController@mapOrbit')->name('home.map-orbit');
