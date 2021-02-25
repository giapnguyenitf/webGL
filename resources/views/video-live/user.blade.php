@extends('layouts.master')
@section('title', 'user')
@section('content')

@include('layouts.header')

<div class="container-fluid page__container">
  <live-video></live-video>
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
