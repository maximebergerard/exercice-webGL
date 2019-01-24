import './css/style.styl'

import * as THREE from 'three'

import Rocket from './js/Rocket.js'
import Space from './js/Space.js'
import LittlePrince from './js/LittlePrince.js'
import Button from './js/Button.js';

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


renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

right = new THREE.Vector3()
up = new THREE.Vector3()
at = new THREE.Vector3()
    

camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 8000)
camera.matrix.extractBasis(right,up,at)
camera.position.y = 0
camera.position.x = 0    
scene = new THREE.Scene()
scene.add(camera) 

window.addEventListener("keydown", onKeyDown, false)
window.addEventListener("keyup", onKeyUp, false)

const animate = () =>  
{
    window.requestAnimationFrame(animate)
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
animate()

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
//

/**
 * Rocket + moon
 */
const rocket = new Rocket({
    textureLoader: textureLoader
})
scene.add(rocket.container)
//

/**
 * Space background
 */
const littlePrince = new LittlePrince({
    textureLoader: textureLoader
})
scene.add(littlePrince.container)
//

/**
 * Little prince + sphere
 */
const space = new Space({
    textureLoader: textureLoader
})
scene.add(space.container)
//

/**
 * Button
 */
const button = new Button()
scene.add(button.container)
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