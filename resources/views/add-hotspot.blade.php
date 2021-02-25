<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webgl demo</title>
  <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
</head>

<body>
  <div class="container">
    <form action="{{ route('hotspots.store') }}" method="post" class="mt-5" enctype="multipart/form-data">
      @method('POST')
      @csrf
      <div class="row">
        <div class="col-12">
          @if ($errors->any())
          <div class="alert alert-danger">
            <ul>
              @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
          @endif
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-5">
          <h1 class="text-center">Add hotspot</h1>
        </div>

        <div class="col-12">
          <h4>Hotspot position</h4>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="x_axis">X Axis</label>
            <input class="form-control" type="text" name="x_axis" id="x_axis" value="0">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="y_axis">Y Axis</label>
            <input class="form-control" type="text" name="y_axis" id="y_axis" value="0">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="z_axis">Z Axis</label>
            <input class="form-control" type="text" name="z_axis" id="z_axis" value="0">
          </div>
        </div>

        <div class="col-12">
          <h4>Camera position</h4>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="camera_x_axis">X Axis</label>
            <input class="form-control" type="text" name="camera_x_axis" id="camera_x_axis" value="0">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="camera_y_axis">Y Axis</label>
            <input class="form-control" type="text" name="camera_y_axis" id="camera_y_axis" value="0">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="camera_z_axis">Z Axis</label>
            <input class="form-control" type="text" name="camera_z_axis" id="camera_z_axis" value="0">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-1">
          <button class="btn btn-primary btn-block" type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
  <script src="{{ asset('/js/app.js') }}"></script>
</body>

</html>
