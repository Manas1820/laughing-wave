import './style.css'
// import * as THREE from 'three'
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
//import gsap from 'gsap'
//import * as dat from 'dat.gui'

//constant to define color of the mesh and add to debug
const parameters = {
  color:0xff0000
}


// Canvas
const canvas = document.getElementById('webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Texture Loader
 */


const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad =  ( ) => {
	console.log( 'Loading complete!');
};


manager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError =  ( url ) => {
	console.log( 'There was an error loading ' + url );
};

const textureLoader = new THREE.TextureLoader(manager);

// Add a new texture like this const chessBoard = textureLoader.load('checkerboard-8x8.png')

//const  = textureLoader.load('')



/**
 * Axes Helper
 */

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

/**
 * Objects
 */


const material =  new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })
const mesh = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  material
)
 
scene.add(mesh)

// const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube1.position.x = - 1.5
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube2.position.x = 0
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube3.position.x = 1.5
// group.add(cube3)

/**
 * Sizes
 */
const sizes = {
    width: innerWidth,
    height: innerHeight
}

/**
 * Debug
 */


/*
const gui = new dat.GUI()


// to move coordinates
gui.add(mesh.position, 'x', -3, 3, 0.01)
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'z', -3, 3, 0.01)

// To add Checkbox
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')


//To add change of colors
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})

*/

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
// camera.lookAt(new THREE.Vector3(0, - 1, 0))
scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias:true,
})
renderer.setSize(sizes.width, sizes.height)


// --------------------------------------------------------------------------------------

//Mouse Movements
const raycaster = new THREE.Raycaster()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableZoom = false
const mouse = {
  x: undefined,
  y: undefined
}

// -----------------------------------------------------------------------------------
// Event Listners



// To handle screen size changes 
addEventListener('resize', () => {
  sizes.width = innerWidth
  sizes.height = innerHeight

  //Update the camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //Update the renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(devicePixelRatio)
})

// To handle full screen mode

/*
addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if(canvas.requestFullscreen)
      canvas.requestFullscreen()
    else if (canvas.webkitFullscreenElement)
      canvas.webkitFullscreen()
  }
  else {
    if(document.exitFullscreen)
      document.exitFullscreen()
    else if (document.webkitExitFullscreen)
      document.webkitExitFullscreen()
  }

})

*/

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})


// ------------------------------------------------------------------------------------
const clock = new THREE.Clock()

//To add animations to the bock
// gsap.to(cube2.position, { duration: 1, delay: 1, y: 1 })
// gsap.to(cube2.position, { duration: 1, delay: 2, y: 0 })

// Animations
let time = Date.now()
function animate() {
  // Calculate the FPS
  const currentTime = Date.now()
  let deltaTime = currentTime - time
  time = currentTime

  //Another method is to use the Three js clock
  const elaspedTime = clock.getElapsedTime()
  
  //To add move movement effects
  // cube2.position.y = mouse.y * 0.07
  // cube2.position.x = mouse.x * 0.07
  
  //cube3.position.y = Math.sin(elaspedTime)
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  controls.update()
}



animate()
