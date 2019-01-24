import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import ceresDiffuseSource from '../images/textures/ceres.jpg'

import princeObject from '../assets/chibiprince.obj'
import princeMaterials from '../assets/chibiprince.mtl'
import roseObject from '../assets/rose.obj'
import roseMaterials from '../assets/rose.mtl'

export default class LittlePrince
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader

        this.container = new THREE.Object3D()

        this.setGlobe()
        this.setObject()
        this.setRose()
    }
    
    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(100, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(ceresDiffuseSource),
            metalness: 0.3, 
            roughness: 0.8, 
            side: THREE.DoubleSide
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.globe.mesh.position.x = -1000
        this.container.add(this.globe.mesh)
    }
    setObject()
    {
        this.prince = {}

        this.prince.mtlLoader = new MTLLoader()
        this.prince.objLoader = new OBJLoader()
        
        this.prince.mtlLoader.load(princeMaterials, (materials) => {
            materials.preload()
            this.prince.objLoader.setMaterials(materials)
            this.prince.objLoader.load(princeObject, (object) => {
                this.object = object

                this.object.scale.x = 0.2
                this.object.scale.y = 0.2
                this.object.scale.z = 0.2
                function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
                    object.rotateX(THREE.Math.degToRad(degreeX))
                    object.rotateY(THREE.Math.degToRad(degreeY))
                    object.rotateZ(THREE.Math.degToRad(degreeZ))
                }
                rotateObject(this.object, -90, 0, 0)
                this.object.position.x = -1000
                this.object.position.y = 128
        
        
                this.container.add(this.object)
            })
        })
    }
    setRose()
    {
        this.rose = {}

        this.rose.mtlLoader = new MTLLoader()
        this.rose.objLoader = new OBJLoader()
        
        this.rose.mtlLoader.load(roseMaterials, (materials) => {
            materials.preload()
            this.rose.objLoader.setMaterials(materials)
            this.rose.objLoader.load(roseObject, (object) => {
                this.object = object

                this.object.scale.x = 10
                this.object.scale.y = 10
                this.object.scale.z = 10
                function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
                    object.rotateX(THREE.Math.degToRad(degreeX))
                    object.rotateY(THREE.Math.degToRad(degreeY))
                    object.rotateZ(THREE.Math.degToRad(degreeZ))
                }
                rotateObject(this.object, 0, -15, 0)
                this.object.position.x = -985
                this.object.position.y = 105
        
        
                this.container.add(this.object)
            })
        })

    }
}