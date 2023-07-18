import React from 'react';
import * as THREE from 'three';
import * as Tone from 'tone';

// songs

// first song test
const firstSong = ["a", "a", "a", "z", "e", "z", "a", "e", "z", "z", "a"]

function App() {
  const canvasRef = React.useRef(null);
  const rendererRef = React.useRef(null);

  const scene = new THREE.Scene();
  const notes = new THREE.Group();
  scene.add(notes);


  const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  const cube4 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  const cube5 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  const cube6 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  const cube7 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));

  cube1.position.x = -4.5;
  cube2.position.x = -3;
  cube3.position.x = -1.5;
  cube5.position.x = 1.5;
  cube6.position.x = 3;
  cube7.position.x = 4.5;
  notes.add(cube1);
  notes.add(cube2);
  notes.add(cube3);
  notes.add(cube4);
  notes.add(cube5);
  notes.add(cube6);
  notes.add(cube7);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    20
  );

  camera.position.z = 5;
  camera.position.y = 2;

  const synth = new Tone.Synth().toDestination();


  React.useEffect(() => {
    // Render

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current
    });

    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    renderer.render(scene, camera);

    rendererRef.current = renderer;

    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const startAudioContext = () => {
    Tone.start();
    playSong(firstSong);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'a')
      animation(notes.children[0], "C4");
    if (event.key === 'z')
      animation(notes.children[1], "D4");
    if (event.key === 'e')
      animation(notes.children[2], "E4");
    if (event.key === 'r')
      animation(notes.children[3], "F4");
    if (event.key === 't')
      animation(notes.children[4], "G4");
    if (event.key === 'y')
      animation(notes.children[5], "A4");
    if (event.key === 'u')
      animation(notes.children[6], "B4");
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


  const animation = async (cube, note) => {
    synth.triggerAttackRelease(note, "8n");
    for (var i = 0; i <= 30; i++) {
      cube.position.y = THREE.MathUtils.lerp(0, 3, i / 30); // Remonter jusqu'à 5
      rendererRef.current.render(scene, camera);
      await delay(10);
    }

    for (var i = 0; i <= 30; i++) {
      cube.position.y = THREE.MathUtils.lerp(3, 0, i / 30); // Descendre jusqu'à -1
      rendererRef.current.render(scene, camera);
      await delay(10);
    }
  };

  const playSong = async (notesSequences) => {
    for (var i = 0; i != notesSequences.length; i++) {
      if (notesSequences[i] === 'a')
        animation(notes.children[0], "C4");
      else if (notesSequences[i] === 'z')
        animation(notes.children[1], "D4");
      else if (notesSequences[i] === 'e')
        animation(notes.children[2], "E4");
      else if (notesSequences[i] === 'r')
        animation(notes.children[3], "F4");
      else if (notesSequences[i] === 't')
        animation(notes.children[4], "G4");
      else if (notesSequences[i] === 'y')
        animation(notes.children[5], "A4");
      else if (notesSequences[i] === 'u')
        animation(notes.children[6], "B4");
      await delay(500);
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} />
      <div style={{display: 'flex'}}>
        <button onClick={startAudioContext}>Start Audio</button>
        <h3>Utiliser les touches de 'a' à 'u' pour jouer</h3>
      </div>
    </div>
  )
}

export default App;
