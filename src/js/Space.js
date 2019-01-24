import * as THREE from 'three'

import spaceDiffuseSource from '../images/textures/space.jpg'

export default class Space
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader

        this.container = new THREE.Object3D()

        this.setBackground()
    }
    
    setBackground()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(4000, 100, 100)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(spaceDiffuseSource),
            metalness: 0.3, 
            roughness: 0.8, 
            side: THREE.BackSide
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }
}