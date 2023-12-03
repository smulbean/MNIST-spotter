import { useRef, useEffect, useState } from 'react';
import ReImg from '../../reimg/reimg.js';
import axios from 'axios';

const DrawingCanvas = () => {

	const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
	const [response, setResponse] = useState(null)
	const [drawnImage, setDrawnImage] = useState(null)
  
  const borderThickness = 1;
  const canvas2Window = 0.5;
  const lineWidth = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = Math.min(window.innerWidth, window.innerHeight)*2*canvas2Window;
    canvas.height = canvas.width;
    canvas.style.width = `${canvas.width/2}px`;
    canvas.style.height = `${canvas.height/2}px`;
    canvas.style.border = `${borderThickness}px solid black`;

    const context = canvas.getContext("2d");
    context.scale(2,2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = lineWidth;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fill();
    contextRef.current = context;
  }, [])
  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }
  const draw = ({nativeEvent}) => {
    if (!isDrawing) {
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }
  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.rect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.fillStyle = "white";
    contextRef.current.fill();

    contextRef.current.rect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.fillStyle = "white";
    contextRef.current.fill();
  }

	const predict = async () => {
    console.log("button pressed!")
		const imageURL = canvasRef.current.toDataURL();
    // console.log(imageURL)
    setDrawnImage(await toImageFile(imageURL, "image.png"));

    console.log("got image!")
    

    const storedImage = drawnImage;
    // console.log(storedImage)

    if (storedImage) {
      console.log("post req started!")
      const formData = new FormData();
      formData.append('image', storedImage);

      const apiUrl = 'http://127.0.0.1:5000/predict';
      // console.log(formData);
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponse(response.data.result);
        // Handle the response as needed
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle errors
      }
    } else {
      console.error('No image selected for upload.');
    }
  };

  const toImageFile = (url, fileName) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new File([blob], fileName, {
        type: "image/png"
      }))
  }

  return (
    <div>
			<div>
				<canvas
					id="DrawingCanvas"
					onMouseDown={startDrawing}
					onMouseUp={finishDrawing}
					onMouseMove={draw}
					ref={canvasRef}
				/>
					
			</div>
			<div>
				<button type="submit" text-align="center" onClick={clearCanvas}>Clear</button>
			</div>
			<div>
				<button type="submit" text-align="center" onClick={predict}>Predict</button>
			</div>
			<div>
				<h1 id="PredictText">Prediction: {response}</h1>
			</div>
    </div>
    
  )
}

export default DrawingCanvas;
