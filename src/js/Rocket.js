import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import moonDiffuseSource from '../images/textures/moon.jpg'
import moonNormalSource from '../images/textures/normal.jpg'

import rocketObject from '../assets/CartoonRocket.obj'
import rocketMaterials from '../assets/CartoonRocket.mtl'

export default class Rocket
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader

        this.container = new THREE.Object3D()

        this.setMoon()
        this.setRocket()
    }

    setMoon()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(200, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(moonDiffuseSource),
            normalMap: this.textureLoader.load(moonNormalSource),
            metalness: 0.3, 
            roughness: 0.8, 
            side: THREE.DoubleSide
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.globe.mesh.position.x = 1500
        this.container.add(this.globe.mesh)
    }
    setRocket()
    {
        this.rocket = {}

        this.rocket.mtlLoader = new MTLLoader()
        this.rocket.objLoader = new OBJLoader()
        
        this.rocket.mtlLoader.load(rocketMaterials, (materials) => {
            materials.preload()
            this.rocket.objLoader.setMaterials(materials)
            this.rocket.objLoader.load(rocketObject, (object) => {
                this.object = object

                this.object.scale.x = 12
                this.object.scale.y = 12
                this.object.scale.z = 12
                this.object.position.x = 1400
                this.object.position.y = 185
        
                function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
                    object.rotateX(THREE.Math.degToRad(degreeX))
                    object.rotateY(THREE.Math.degToRad(degreeY))
                    object.rotateZ(THREE.Math.degToRad(degreeZ))
                }
                rotateObject(this.object, 0, 0, 30)
        
                this.container.add(this.object)
            })
        })
    }
}