<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webgl demo</title>
  <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
  <style>
    .annotation {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      margin-left: 15px;
      margin-top: 15px;
      padding: 1em;
      width: 200px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 0.5em;
      font-size: 12px;
      line-height: 1.2;
      transition: opacity 0.5s;
    }

    .annotation a {
      display: block;
      margin-bottom: 5px
    }
  </style>
</head>

<body>
  <div id="app">
    <div id="container">
    </div>
  </div>

  <script src="{{ asset('/js/app.js') }}"></script>

  <script>
    const wsServer = "{{ env('WS_SERVER', 'http://localhost:3000') }}";
    const object3Ds = {!! $object3Ds->toJson() !!};
    const hotspots = {!! $hotspots->toJson() !!};
    const socket = io(wsServer);
    socket.on('connect', () => console.log('connected to socket success'));
    socket.emit('add_user', 1);
  </script>
  <script src="{{ asset('/js/user.js') }}"></script>
</body>

</html>
