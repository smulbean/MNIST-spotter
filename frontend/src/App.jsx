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
      <section class="glowing-cards">
        <div class="card">
          <div class="card-content">
          <h2>OUR PROJECT </h2>
          <h3>By Douglas Chen and Grace Yin</h3>
          <p>
          <br></br>
          Embark on a journey into the world of image recognition with our cutting-edge project, 
          crafted by students from UBC and UWaterloo. <br></br>Powered by Python, React, and Flask, our endeavor 
          centers around a high-performance AI model trained on the renowned MNIST dataset. <br></br> <br></br>

          With a staggering accuracy rate of 99%, our model stands as a testament to the robustness 
          and efficacy of modern machine learning techniques. <br></br> However, in our relentless pursuit of 
          perfection, we acknowledge the insatiable appetite for data. <br></br>Despite achieving remarkable 
          accuracy, we recognize the importance of continuously enriching our dataset to further enhance the model's capabilities. <br></br> <br></br>

          Through meticulous data collection and augmentation efforts, we aim to bolster our model's 
          robustness and versatility across diverse scenarios. <br></br> By leveraging additional data sources and 
          refining our training methodologies, we strive to push the <br></br> boundaries of image recognition accuracy and unlock new realms of potential. <br></br> <br></br>   

          As we embark on this quest for excellence, we invite collaborators and enthusiasts alike to 
          join us <br></br> in our pursuit of advancing the frontiers of AI-powered image recognition. <br></br>Together, 
          we can harness the power of data to drive innovation and shape a future where intelligence knows no bounds.  
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
