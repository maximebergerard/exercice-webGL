import './css/style.styl'

import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import Rocket from './js/Rocket.js'

let renderer, scene, camera = []
let right, up, at
let rotation = 0
let directions = {}
directions.forward = false
directions.backward = false
directions.left = false
directions.right = false


init()
animate()

function init() {
    /**
     * Sizes
     */
    const sizes = {}
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

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

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    right = new THREE.Vector3()
    up = new THREE.Vector3()
    at = new THREE.Vector3()
    

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.matrix.extractBasis(right,up,at)
    camera.position.y = 5
    
    scene = new THREE.Scene()
    scene.add(camera) 

    window.addEventListener("keydown", onKeyDown, false)
    window.addEventListener("keyup", onKeyUp, false)

    window.addEventListener('mousemove', (_event) =>
    {
        cursor.x = _event.clientX / sizes.width - 0.5
        cursor.y = _event.clientY / sizes.height - 0.5
        
        let box = {}
        box.minX = Math.abs(sizes.width - 400) / 2
        box.maxX = box.minX + 400
        
        if(_event.clientX < box.minX) {
            rotation = Math.min(0.1, 0.0001 * (box.minX - _event.clientX))
        }
        else if(_event.clientX > box.maxX) {
            rotation = Math.max(-0.1, -0.0001 * (_event.clientX - box.maxX))
        }
        else {
            rotation = 0
        }
    })
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
cursor.x = 0
cursor.y = 0

/**
 * Lights 
 */

const skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 3 )
skyLight.position.x = 0
scene.add(skyLight)

/**
 * Rocket
 */

const rocket = new Rocket()
scene.add(rocket.container)

import rocketObject from './assets/roket.obj'
import rocketMaterials from './assets/roket.mtl'

const mtlLoader = new MTLLoader()
const objLoader = new OBJLoader()


mtlLoader.load(rocketMaterials, (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load(rocketObject, (object) => {
        object.scale.x = 0.2
        object.scale.y = 0.2
        object.scale.z = 0.2

        function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
            object.rotateX(THREE.Math.degToRad(degreeX))
            object.rotateY(THREE.Math.degToRad(degreeY))
            object.rotateZ(THREE.Math.degToRad(degreeZ))
        }
        rotateObject(object, -90, 0, 0)

        scene.add(object)
    })
})
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