import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Group, Mesh, Sprite } from 'three';

let renderer = new THREE.WebGLRenderer({ antialias: true });
let mouse = new THREE.Vector2();
let objLoader = new OBJLoader();
let building = new THREE.Object3D();
let raycaster = new THREE.Raycaster();
let camera, scene, controls, INTERSECTED, sprite;

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

  // for (let index = 0; index <= 8; index++) {
  //     objLoader.load('../models/block.obj', function (floor) {
  //         floor.name = 'floor';
  //         floor.position.y = index * 1.3;
  //         floor.userData = { url: 'https://www.google.com/' };
  //         building.add(floor);
  //     })
  // }

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

  // add building top
  // objLoader.load('../models/roof.obj', function (roof) {
  //     roof.position.y = 11.8;
  //     building.add(roof);
  // })

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
  // scene.add(sprite);

  // add floor label
  // addLabel('F 1', new THREE.Vector3( 4, 0.5, 2 ));
  // addLabel('F 2', new THREE.Vector3( -6, 2.5, 2 ));
  // addLabel('F 3', new THREE.Vector3( -1, 4.5, 5 ));
  // addLabel('F 4', new THREE.Vector3( 4, 6.5, 2 ));
  // addLabel('F 5', new THREE.Vector3( -1, 8.5, 5 ));
  // addLabel('F 6', new THREE.Vector3( -6, 10.5, 2 ));
  // addLabel('F 7', new THREE.Vector3( -1, 12.5, 5 ));
  // addLabel('F 8', new THREE.Vector3( 4, 14.5, 2 ));
  // addLabel('F 9', new THREE.Vector3( -1, 16.5, 5 ));

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
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  // add controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', (event) => {
    console.log(event);
  });
  controls.update();

  // add event listener
  window.addEventListener('resize', onWindowResize);
  container.addEventListener('click', onClick);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
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
      if (obj.parent.name == 'floor') {
        obj.parent.userData.url && window.open(obj.parent.userData.url)
      } else if (obj.parent.name == 'group_boxes') {
        obj.userData.url && window.open(obj.userData.url)
      }
    }
  }
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

// apply event changed scene
socket.on('changed_scene', (event) => {
  let matrix = event;
  camera.matrixAutoUpdate = false
  camera.matrix.fromArray(matrix.elements)
  render();
});
