import * as THREE from 'three'

import moonDiffuseSource from '../images/textures/moon.jpg'
import moonNormalSource from '../images/textures/normal.jpg'

export default class Rocket
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader

        this.container = new THREE.Object3D()

        this.setMoon()
    }

    setMoon()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(400, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(moonDiffuseSource),
            normalMap: this.textureLoader.load(moonNormalSource),
            metalness: 0.3, 
            roughness: 0.8, 
            side: THREE.DoubleSide
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.globe.mesh.position.x = 500
        this.container.add(this.globe.mesh)
    }
}