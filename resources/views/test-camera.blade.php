<!DOCTYPE html>
<html lang="en">

<head>
    <title>three.js webgl - map controls</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="main.css">
    <style>
        body {
            background-color: #ccc;
            color: #000;
        }

        a {
            color: #f00;
        }
    </style>
</head>

<body>
    <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - map controls
    </div>

    <script type="module">
        import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
        import { MapControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

        let camera, controls, scene, renderer;

        const pipeSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(1120, 1040, 0),
            new THREE.Vector3(800, 460, -140),
            new THREE.Vector3(600, 220, -310),
            new THREE.Vector3(400, 200, -526),
            new THREE.Vector3(0, 200, -661),
            new THREE.Vector3(-200, 200, -630),
        ]);

        let parent, mesh, tubeGeometry;
        const material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.3, wireframe: true, transparent: true });

        let time = 0.0;
        let position = new THREE.Vector3();
        let binormal = new THREE.Vector3();
        const direction = new THREE.Vector3();
        const normal = new THREE.Vector3();
        let lookAtVector = new THREE.Vector3();

        init();
        //render();
        // remove when using next line for animation loop (requestAnimationFrame)
        animate();

        function init() {

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcccccc);
            scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            //renderer.setAnimationLoop(animation);

            document.body.appendChild(renderer.domElement);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(1300, 400, 0);
            camera.rotation.y = 0;

            camera.lookAt(lookAtVector);

            parent = new THREE.Object3D();
            scene.add(parent);
            //addTube();

            // controls

            controls = new MapControls(camera, renderer.domElement);

            // world

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            geometry.translate(0, 0.5, 0);
            const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

            for (let i = 0; i < 500; i++) {

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = Math.random() * 1600 - 800;
                mesh.position.y = 0;
                mesh.position.z = Math.random() * 1600 - 800;
                mesh.scale.x = 20;
                mesh.scale.y = Math.random() * 80 + 10;
                mesh.scale.z = 20;
                mesh.updateMatrix();
                mesh.matrixAutoUpdate = false;
                scene.add(mesh);

            }

            // lights

            const dirLight1 = new THREE.DirectionalLight(0xffffff);
            dirLight1.position.set(1, 1, 1);
            scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0x002288);
            dirLight2.position.set(- 1, - 1, - 1);
            scene.add(dirLight2);

            const ambientLight = new THREE.AmbientLight(0x222222);
            scene.add(ambientLight);

            //

            window.addEventListener('resize', onWindowResize);
        }

        function addTube() {

            if (mesh !== undefined) {

                parent.remove(mesh);
                mesh.geometry.dispose();
            }

            tubeGeometry = new THREE.TubeGeometry(pipeSpline, 100, 2, 3, false);

            addGeometry(tubeGeometry);

            setScale();

        }

        function setScale() {

            //mesh.scale.set(params.scale, params.scale, params.scale);

        }


        function addGeometry(geometry) {

            // 3D shape

            mesh = new THREE.Mesh(geometry, material);
            const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
            mesh.add(wireframe);

            parent.add(mesh);

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            update();

            render();
        }

        function animation(time) {
            render();
        }

        function update() {
            time += 0.004;

            THREE.MathUtils.smoothstep(time, 0.0, 1.0);

            pipeSpline.getPointAt(time, position);

            if (position == null) {
                return;
            }

            position.y += 10;

            camera.position.copy(position);
            camera.lookAt(lookAtVector);
        }

        function render() {

            renderer.render(scene, camera);

        }

    </script>

</body>

</html>
