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
      <section class="glowing-cards">
        <div class="card">
          <div class="card-content">
          <h2>OUR PROJECT</h2>
          <p>Our project is based on MNIST model, python, 
              react, flask, and other stuff, blah blah blah,
              This is an image recognition, feel free to play with the model
          </p>
          </div>
        </div>
      </section>
      <br></br>
      <footer class="footer">
        <p> &copy;2023 All Rights Reserved</p>
       </footer>
    </div>
  )
}

export default App;
