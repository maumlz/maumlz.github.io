import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.getElementById('myCanvas')
console.log(THREE)

console.log(canvas)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const geometry = new THREE.SphereBufferGeometry(5, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const rg = new THREE.RingGeometry(0.5, 1.5, 32);
const rm = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true,
  side: THREE.DoubleSide
})

const shader = new THREE.ShaderMaterial({
  vertexShader:`
  varying vec2 vuv;
  void main(){
    vuv = position.xy;
    vec3 newPos = position;

    if( position.x > 0.0){
      newPos.x *= 2.0;
    }
    

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }

  `,
  fragmentShader: `
  varying vec2 vuv;

  void main(){
    // if( abs(length(vuv)) > 0.5 ){
    // }else{
    //   discard;
    // }
    
    gl_FragColor = vec4(abs(vuv), 0.0, 1.);
  }
  `,
  wireframe: true
})

const ring = new THREE.Mesh(rg, shader);
ring.position.y = 0.5
ring.position.z = -1.5
console.log(ring.geometry.attributes.position.array);
// scene.add(ring)


const animate = function () {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();


function onResize(){
  const parent = document.getElementById('header');
  camera.aspect = parent.clientWidth / parent.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( parent.clientWidth, parent.clientHeight );
}

window.addEventListener( 'resize', onResize, false );