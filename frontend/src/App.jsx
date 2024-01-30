import { useRef, useEffect, useState } from 'react';
import './App.css';
import UploadImage from './components/uploadImage/uploadImage.component';
import DrawingCanvas from './components/drawingCanvas/drawingCanvas.component';

function App() {
  return (
    <div className="App">
      <h1 class="title" >React App</h1>
      {/* <UploadImage /> */}
      <DrawingCanvas />
    </div>
  )
}

export default App;
