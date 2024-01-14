import * as tf from "@tensorflow/tfjs";
// import { loadImage } from "canvas";

export async function predict(image: File) {
	console.log(image);

	const model_path = 'converted/model/model.json';
	const model = await tf.loadLayersModel(model_path);
	// model.predict(tf.tensor([]))
	// const handler = tfn.io.fileSystem("./path/to/your/model.json");
	// const model = await tf.loadLayersModel(handler);
	// console.log(model);
	// tf.loadLayersModel()
	return 1;
}