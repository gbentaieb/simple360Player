var THREE = require("three.js")

// Create the 3D scene

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

var canvas = document.getElementById("360Canvas");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( window.innerWidth, window.innerHeight, false );

var video = document.getElementById( 'videoV' );
var texture = new THREE.VideoTexture( video );
texture.minFilter = THREE.LinearFilter;

var material = new THREE.MeshBasicMaterial( {
	map: texture, 
	side: THREE.DoubleSide
} );

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var sphere = new THREE.Mesh( geometry, material );
sphere.scale.x = -1;
scene.add( sphere );

// Render the scene

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

render();

// Add mouse gesture

var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(-deltaX, -deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();

    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();

    mouseDown = false;
}

function addMouseHandler(canvas) {
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
}

function rotateScene(deltaX, deltaY) {
sphere.rotation.y += deltaX / 300;
sphere.rotation.x += deltaY / 300;
}

addMouseHandler(canvas);