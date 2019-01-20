import * as THREE from 'three'

export default class Rocket
{
    constructor()
    {
        this.container = new THREE.Object3D()

        this.setSky()
        this.setLaunchpad()
    }

    setSky()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(20, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial( {color: 0x4169e1, metalness: 0.3, roughness: 0.8, side: THREE.DoubleSide} )
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }
    setLaunchpad()
    {
        this.square = {}
        this.square.geometry = new THREE.BoxBufferGeometry(10, 0.5, 10)
        this.square.material = new THREE.MeshStandardMaterial( { color: 0x808080, metalness: 0.7, roughness: 0.8 })
        this.square.mesh = new THREE.Mesh(this.square.geometry, this.square.material)
        this.container.add(this.square.mesh)
    }
}