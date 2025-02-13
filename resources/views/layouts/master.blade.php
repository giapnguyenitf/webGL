<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>@yield('title', 'home')</title>
  <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
  @stack('css')
</head>

<body>
  <div id="app">
    @yield('content')
  </div>
  <script src="{{ asset('/js/app.js') }}"></script>
  @stack('js')
</body>

</html>
