import './css/style.styl'

import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import Rocket from './js/Rocket.js'
import Space from './js/Space.js'

let renderer, scene, camera = []
let right, up, at
let rotation = 0
let directions = {}
directions.forward = false
directions.backward = false
directions.left = false
directions.right = false

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
//

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
//

/**
 * Sizes
 */
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})
//
init()
animate()

function init() {

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    right = new THREE.Vector3()
    up = new THREE.Vector3()
    at = new THREE.Vector3()
    

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 4000)
    camera.matrix.extractBasis(right,up,at)
    camera.position.y = 5
    
    scene = new THREE.Scene()
    scene.add(camera) 

    window.addEventListener("keydown", onKeyDown, false)
    window.addEventListener("keyup", onKeyUp, false)

}

/**
 * Scene
 */
// const scene = new THREE.Scene()

/**
 * Camera
 */
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// scene.add(camera)

function animate() {
    requestAnimationFrame(animate)
    camera.rotation.y += rotation
    camera.matrix.extractBasis(right,up,at)
    if(directions.forward) {
        camera.position.add(at.multiplyScalar(-2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.backward) {
        camera.position.add(at.multiplyScalar(2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.left) {
        camera.position.add(right.multiplyScalar(-2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.right) {
        camera.position.add(right.multiplyScalar(2))
        camera.matrix.extractBasis(right,up,at)
    }
    renderer.render(scene, camera)
}

function onKeyDown(e) {
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = true
        break
 
        case 38: // Up
        case 90: // Z
            directions.forward = true
        break
 
        case 39: // Right
        case 68: // D
            directions.right = true
        break
 
        case 40: // Down
        case 83: // S
            directions.backward = true
        break
    }
}

function onKeyUp(e) {
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = false
        break
 
        case 38: // Up
        case 90: // Z
            directions.forward = false
        break
 
        case 39: // Right
        case 68: // D
            directions.right = false
        break
 
        case 40: // Down
        case 83: // S
            directions.backward = false
        break
    }
}



/**
 * Cursor
 */
const cursor = {}
cursor.x = sizes.width / 2
cursor.y = sizes.height / 2

const updateRotation = (x, y) => 
{
    camera.rotateY(x * - 0.01)
    camera.rotateX(y * - 0.01)
}
window.addEventListener('mousemove', (_event) =>
{
    cursor.x += _event.movementX
    cursor.y += _event.movementY
    updateRotation(_event.movementX, _event.movementY)
})


/**
 * Lights 
 */

const skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 3 )
skyLight.position.x = 0
scene.add(skyLight)

/**
 * Rocket
 */

const rocket = new Rocket({
    textureLoader: textureLoader
})
scene.add(rocket.container)

import rocketObject from './assets/CartoonRocket.obj'
import rocketMaterials from './assets/CartoonRocket.mtl'

const mtlLoader = new MTLLoader()
const objLoader = new OBJLoader()

mtlLoader.load(rocketMaterials, (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load(rocketObject, (object) => {
        object.scale.x = 12
        object.scale.y = 12
        object.scale.z = 12
        object.position.x = 220
        object.position.y = 300

        function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
            object.rotateX(THREE.Math.degToRad(degreeX))
            object.rotateY(THREE.Math.degToRad(degreeY))
            object.rotateZ(THREE.Math.degToRad(degreeZ))
        }
        rotateObject(object, 0, 0, 40)

        scene.add(object)
    })
})
//

/**
 * Space background
 */
const space = new Space({
    textureLoader: textureLoader
})
scene.add(space.container)
//
/**
 * Loop
 */
// const loop = () =>
// {
    
//     window.requestAnimationFrame(loop)
//     // Update camera
//     // camera.lookAt(new THREE.Vector3())
    
//     // Renderer
//     // renderer.render(scene, camera)
// }
// loop()

// Hot
if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')
    })
}