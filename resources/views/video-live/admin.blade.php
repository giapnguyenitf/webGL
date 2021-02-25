@extends('layouts.master')
@section('title', 'admin')
@section('content')

@include('layouts.header')

<div class="container page__container">
  <input-video></input-video>
</div>

@endsection
@push('css')
<style>
  .page__container {
    margin-top: 20px;
  }
  .header__container {
    height: 50px;
  }
</style>
@endpush
