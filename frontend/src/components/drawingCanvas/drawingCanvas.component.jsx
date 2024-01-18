import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import * as tf from "@tensorflow/tfjs"


// set model
const modelURL = `${process.env.REACT_APP_URL}/converted/model/model.json`;
console.log(modelURL)
const model = await tf.loadLayersModel(modelURL)
const modelInputShape = [28, 28];

const DrawingCanvas = () => {

	const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
	const [response, setResponse] = useState(null)
  
  const borderThickness = 1;
  const canvas2Window = 0.5;
  const lineWidth = 50;
  


  
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
		const context = contextRef.current;
		const canvas = canvasRef.current;
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		
		// gray scale + resize
		var imageTensor = tf.browser.fromPixels(imageData, 3);
		imageTensor = tf.image.resizeBilinear(imageTensor, modelInputShape);
		imageTensor = tf.image.rgbToGrayscale(imageTensor);
		// imageTensor.print()

		// set to: 1 - a/255 (0-1 domain and inversion)
		var buffer = tf.buffer(imageTensor.shape, imageTensor.dtype, imageTensor.dataSync());
		var newBuffer = tf.buffer([1, modelInputShape[0], modelInputShape[1]], imageTensor.dtype)
		for (let y=0; y<modelInputShape[0]; y++) {
			for (let x=0; x<modelInputShape[1]; x++) {
				newBuffer.set(1-buffer.get(y, x, 0)/255.0, 0, y, x);
			}
		}
		console.log(newBuffer);
		imageTensor = newBuffer.toTensor();
		// imageTensor.print();

		// feed into network
		var res = model.predict(imageTensor)
		res = tf.buffer([1, 10], res.dtype, res.dataSync());

		const argMax = (b) => {
			let bestV = b.get(0, 0);
			let bestI = 0;
			for (let i=1; i<b.shape[1]; i++) {
				if (b.get(0, i)>bestV) {
					bestV = b.get(0, i);
					bestI = i;
				}
			}
			return bestI;
		}

		await setResponse(argMax(res));
  	};

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
