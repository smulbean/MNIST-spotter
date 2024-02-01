import { useRef, useEffect, useState } from 'react';
import './App.css';
import UploadImage from './components/uploadImage/uploadImage.component';
import DrawingCanvas from './components/drawingCanvas/drawingCanvas.component';

function App() {
  return (
    <div className="App">
      <br></br>
      <h1 class="title" >MNIST Spotter</h1>
      <br></br>
      {/* <UploadImage /> */}
      <DrawingCanvas />
      <br></br>
      <br></br>
      <footer class="footer">
        <p> &copy;2023 All Rights Reserved</p>
       </footer>
    </div>
  )
}

export default App;
