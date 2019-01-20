import './css/style.styl'

import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

import Rocket from './js/Rocket.js'


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

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

/**
 *  GLTF loader
 */

const loader = new GLTFLoader()
loader.load(
    './objects/rocket.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        scene.add( gltf.scene )
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` )
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error )
    },
)


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

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update camera
    camera.position.x = cursor.x * 3
    camera.position.y = - cursor.y * 3
    camera.lookAt(new THREE.Vector3())

    // Renderer
    renderer.render(scene, camera)
}
loop()

// Hot
if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')
    })
}