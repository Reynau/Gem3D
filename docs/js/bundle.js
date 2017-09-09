(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let fov = 75
let aspect = window.innerWidth / window.innerHeight
let near = 0.1
let far = 1000

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera( fov, aspect, near, far )

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

let controls = new THREE.OrbitControls( camera, renderer.domElement );

let ambientLight =  new THREE.AmbientLight( 0xffffff, 0.5 )
scene.add(ambientLight)

let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
directionalLight.position.set(1,1,1).normalize()
scene.add( directionalLight )

let light = new THREE.PointLight( 0xffffff, 1, 100 )
light.position.set( 50, 50, 50 )
scene.add( light )

// Base
let baseGeometry = new THREE.CylinderGeometry( 20, 30, 10, 30 )
let baseMaterial = new THREE.MeshPhongMaterial( {
  color: 0x444444,
  shininess: 10,
  specular: 0xffffff,
} )
let base = new THREE.Mesh( baseGeometry, baseMaterial )
scene.add( base )

// Gem
let gem = new THREE.Group()
// Back face
let backFaceGemGeometry = new THREE.IcosahedronGeometry( 25 )
let backFaceGemMaterial = new THREE.MeshLambertMaterial( {
  color: 0xff0000,
  opacity: 0.5,
  transparent: true
} )
let backFaceGem = new THREE.Mesh( backFaceGemGeometry, backFaceGemMaterial )
backFaceGem.material.side = THREE.BackSide
backFaceGem.renderOrder = 0
gem.add( backFaceGem )
// Front face
let frontFaceGemGeometry = new THREE.IcosahedronGeometry( 25 )
let frontFaceGemMaterial = new THREE.MeshPhongMaterial( {
  color: 0xaa0000,
  shininess: 100,
  specular: 0xffffff,
  opacity: 0.5,
  transparent: true
} )
let frontFaceGem = new THREE.Mesh( frontFaceGemGeometry, frontFaceGemMaterial )
frontFaceGem.material.side = THREE.FrontSide
frontFaceGem.renderOrder = 1
gem.add( frontFaceGem )
gem.position.set(0, 40, 0)
scene.add( gem )

camera.position.y = 100
camera.position.z = 100
camera.lookAt(new THREE.Vector3(0,0,0))

function animate() {
  requestAnimationFrame( animate )
  gem.rotation.y += 0.005
  gem.rotation.x += 0.005
  renderer.render( scene, camera )
}
animate()
},{}]},{},[1]);
