import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Group, Mesh, Sprite } from 'three';
import axios from 'axios';

let camera, scene, renderer, controls, INTERSECTED, sprite;
let mouse = new THREE.Vector2();
let objLoader = new OBJLoader();
let building = new THREE.Object3D();
let raycaster = new THREE.Raycaster();
let axiosConfig = {
  headers: {
    'Authorization': 'Bearer cd8aa9ed75b5e5f3bf1f6043f9b9eec7420429064f842c57a24d24289fd33cc0'
  }
}

// render to div
const container = document.getElementById('container');

init();
render();

function init() {
  // create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2e3137);

  // add light to scene
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 1.0, 0.5).normalize();
  scene.add(light);

  // add camera to scene
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 28, 75);
  scene.add(camera);

  // add grid
  const grid = new THREE.GridHelper(50, 50, 0x636363, 0x636363);
  scene.add(grid);

  // add building floor
  building.name = 'building';
  building.position.y = 0;
  building.scale.set(1.5, 1.5, 1.5);
  scene.add(building);

  object3Ds.forEach(function (item, index) {
    objLoader.load('../models/' + item.path, function (upload) {
      upload.position.x = item.x_axis;
      upload.position.y = item.y_axis;
      upload.position.z = item.z_axis;
      upload.name = `floor_${item.id}`;
      upload.userData = item;
      building.add(upload);
    })
  });

  // add obj city
  objLoader.load('../models/city.obj', function (city) {
    city.scale.set(1.5, 1.5, 1.5);
    city.name = 'city';
    scene.add(city);
  });

  // add hotspot
  hotspots.forEach(function (item, index) {
    let hotspot = new THREE.TextureLoader().load('../img/photo-camera.svg');
    let spriteMasterial = new THREE.SpriteMaterial({ map: hotspot });
    sprite = new THREE.Sprite(spriteMasterial);
    sprite.name = `hotspot_${item.id}`;
    sprite.userData = item;
    sprite.position.set(item.x_axis, item.y_axis, item.z_axis);
    sprite.scale.set(2, 2, 2);
    scene.add(sprite);
  })

  // add sprite
  let map = new THREE.TextureLoader().load('../img/logo-light.png');
  let material = new THREE.SpriteMaterial({ map: map });
  sprite = new THREE.Sprite(material);
  sprite.position.y = 21;
  sprite.scale.set(3, 3, 3);
  sprite.userData = { url: 'https://ideabox.com.au/' };

  // add cube with hover
  var groupBoxes = new THREE.Group();
  groupBoxes.add(createCube(0.5, 0, 0x232526, 'https://ideabox.com.au/'));
  groupBoxes.add(createCube(1.5, 0.5, 0x085078, 'https://threejs.org/docs/'));
  groupBoxes.add(createCube(2.5, 0, 0xff8008, 'https://www.google.com/'));
  groupBoxes.position.set(10, 0, 0);
  groupBoxes.scale.set(2, 4, 2);
  groupBoxes.name = 'group_boxes';
  // scene.add(groupBoxes);

  // render scene
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  // add controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', function (event) {
    emitEvent(event.target.object.matrix);
    render();
  });
  controls.update();

  // add event listener
  window.addEventListener('resize', onWindowResize);
  container.addEventListener('click', onClick);
  // document.addEventListener('mousemove', onDocumentMouseMove, false);
}

// handle on mousen move event
function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    let obj = intersects[0].object;

    if (obj instanceof Mesh && obj.parent.name == 'floor') {
      obj = obj.parent;

      if (obj != INTERSECTED) {
        if (INTERSECTED) {
          INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
          INTERSECTED = intersects[0].object;
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          INTERSECTED.material.color.setHex(0xffff00);
        } else {
          INTERSECTED = intersects[0].object;
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          INTERSECTED.material.color.setHex(0xffff00);
        }
      }
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
  }

  renderer.render(scene, camera);
}

// handle on click event
function onClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    if (intersects[0].object instanceof Sprite) {
      let sprite = intersects[0].object;
      let userData = sprite.userData;
      camera.position.set(userData.camera_x_axis, userData.camera_y_axis, userData.camera_z_axis);
      controls.update();
    } else if (intersects[0].object instanceof Mesh) {
      let obj = intersects[0].object;

      updateBuildingColor(obj);

      if (obj.parent.name == 'floor') {
        obj.parent.userData.url && window.open(obj.parent.userData.url)
      } else if (obj.parent.name == 'group_boxes') {
        obj.userData.url && window.open(obj.userData.url)
      }
    }
  }
}

async function getLampStatus(selector)
{
  let url = `https://api.lifx.com/v1/lights/${selector}`;

  return (await axios.get(url, axiosConfig)).data;
}

async function toggleTheLamp(selector, power = 'off', color = null)
{
  color = color || '#ffffff';
  let url = `https://api.lifx.com/v1/lights/${selector}/state`;
  let lamps = await getLampStatus(selector);
  let data = {
    "power": power,
    "color": `${color} saturation:0.5`,
    "brightness": 1
  };

  if (lamps.length && lamps[0].connected) {
    let res = await axios.put(url, data, axiosConfig);
  } else {
    console.log('Please connect to the lamp');
  }
}

async function updateBuildingColor(obj)
{
  let parent = obj.parent;
  let userData = parent.userData;
  let color = userData.color || '#FF5151';

  // preview video
  emitPreviewVideoEvent(userData.video_url);

  // change light color
  if (obj != INTERSECTED) {
    if (INTERSECTED) {
      INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      INTERSECTED = obj;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.setHex(getHexColor(color));
      toggleTheLamp('d073d5632d28', 'on', color);
    } else {
      INTERSECTED = obj;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.setHex(getHexColor(color));
      toggleTheLamp('d073d5632d28', 'on', color);
    }
  } else {
    let lamps = await getLampStatus('d073d5632d28');

    if (lamps[0] && lamps[0].connected) {
      if (lamps[0].power == 'on') {
        toggleTheLamp('d073d5632d28', 'off', color);
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      } else {
        toggleTheLamp('d073d5632d28', 'on', color);
        INTERSECTED.material.color.setHex(getHexColor(color));
      }
    }
  }

  renderer.render(scene, camera);
}

function getHexColor(color)
{
  return color.replace('#', '0x');
}

// handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// create animate for scene
function animate() {
  requestAnimationFrame(animate);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.update();
  render();
}

// render draw
function render() {
  renderer.render(scene, camera);
}

// create cube
function createCube(x, y, color = 0x4389a2, url = '') {
  const geometry = new THREE.BoxGeometry(2, 1, 2);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.y = x;
  cube.position.x = y;
  cube.userData = { url: url, originalColor: color };

  return cube;
}

// add label
function addLabel(name, location) {
  const loader = new THREE.FontLoader();
  loader.load('../font/BNPP Sans Condensed_Bold.json', function (font) {
    const textGeo = new THREE.TextBufferGeometry(name, {
      font: font,
      size: 1,
      height: 1,
      curveSegments: 1
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x061385 });
    const textMesh = new THREE.Mesh(textGeo, textMaterial);
    textMesh.position.copy(location);
    textMesh.name = 'floor_label';
    scene.add(textMesh);
  });
}

// emit event change to user
function emitEvent(event) {
  socket.emit('changed_scene', {
    room: 'user_1',
    data: event
  });
}

function emitPreviewVideoEvent(src) {
  if(src) {
    socket.emit('preview_video', {
      room: 'user_1',
      data: {
        src: src
      }
    });
  }
}
