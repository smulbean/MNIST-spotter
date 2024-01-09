import { predict } from './model'


async function saveImage(image: FormDataEntryValue) {

}

export async function POST(req: Request) {
	const formData = await req.formData();
	const image = formData.get('image');
	if (!image) return Response.json({'error': 'no image found'});

	const image_file = image as File;
	const res = predict(image_file);

	// const res = await predict(image);
	return Response.json({ 'result': res });
}