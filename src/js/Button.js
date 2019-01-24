import * as THREE from 'three'

export default class Button
{
    constructor()
    {
        this.container = new THREE.Object3D()

        this.setButton()
    }
    setButton()
    {
        this.button = {}
        this.button.geometry = new THREE.CylinderBufferGeometry(20, 20, 5, 50) 
        this.button.material = new THREE.MeshStandardMaterial( {metalness: 0.3, roughness: 0.8, color: 0xff0000} )
        this.button.mesh = new THREE.Mesh(this.button.geometry, this.button.material)
        this.container.add(this.button.mesh)
    }
    setBoard()
    {
        this.board = {}
        this.board.geometry = new THREE.BoxBufferGeometry()
    }
}