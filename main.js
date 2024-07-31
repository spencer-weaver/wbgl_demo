import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 8);
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

// controls ------------------------------------------------------------

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


// Cube ----------------------------------------------------------------

// create cube geometry
const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
// create cube material
const cube_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh( cube_geometry, cube_material );

// Line ----------------------------------------------------------------

// create line points
const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
// create line material
const line_material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// create line geometry
const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( line_geometry, line_material );

// Lights ------------------------------------------------------------

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

const ambientLight = new THREE.AmbientLight( 0xffffff );


// Scene ---------------------------------------------------------------

scene.add( directionalLight );
scene.add( ambientLight );

// glTF ----------------------------------------------------------

const loader = new GLTFLoader();

loader.load( '/future_car/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );





import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}


function animate() {
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;
	controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );