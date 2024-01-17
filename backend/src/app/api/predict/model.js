import * as tf from "@tensorflow/tfjs";
import { ImageData } from "canvas";
// import { loadImage } from "canvas";

// const imageGet = require('get-image-data');


const model_url = `${process.env.URL}/converted/model/model.json`
const models = [];

export async function predict(image) {
	if (!model_url) return 'error';
	if (models.length == 0) {
		models.push(await tf.loadLayersModel(model_url));
		console.log("initialized model")
	}
	const model = models[0];

	// const image = new Image()
	// console.log(image)

	// const imageData = new ImageData(28,28);
	// const imageTensor = tf.browser.fromPixels(imageData, 1);
	// console.log(imageTensor)
	// var img = new Image();
	// img.src = URL.createObjectURL(image);
	return 1;
}

