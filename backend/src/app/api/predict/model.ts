import * as tf from "@tensorflow/tfjs";
// import { loadImage } from "canvas";

export async function predict(image: File) {
	console.log(image);

	const model_path = './model.h5'
	// const handler = tfn.io.fileSystem("./path/to/your/model.json");
	// const model = await tf.loadLayersModel(handler);
	// console.log(model);
	// tf.loadLayersModel()
	return 1;
}