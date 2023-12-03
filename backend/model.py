import tensorflow as tf
import numpy as np
import cv2

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def versions():
	print("tensorflow version", tf.__version__)
	print("numpy version", np.__version__)
	print("cv2 version", cv2.__version__)

# dataset
# mnist = tf.keras.datasets.mnist

# organizing data (only using test data here)
# (x_train, y_train), (x_test, y_test) = mnist.load_data()
# x_train, x_test = x_train / 255.0, x_test / 255.

# load model
model = tf.keras.models.load_model("model.h5")

# testing model accuracy
# model.evaluate(x_test, y_test, verbose=2)

IMG_DIR = "image.png"


def run_model(img_dir):
	# convert image to numpy array
	img = cv2.imread(img_dir, cv2.IMREAD_GRAYSCALE) # read img as black and white
	img = cv2.bitwise_not(img) # swap black and white
	img = cv2.resize(img, dsize=(28, 28), interpolation=cv2.INTER_CUBIC) # make image 28x28
	img_arr = np.array(img) # convert img to array


	# if you want to view what img_res looks like:
	# cv2.imshow("win-name", img_res)
	# cv2.waitKey(0)
	# cv2.destroyAllWindows()


	# change each pixel in range [0,255] to range [0, 1]. Note that 0=black, 1=white.
	# make it all black and white
	size = img_arr.shape[0]
	for row in range(size):
		for col in range(size):
			img_arr[row][col] /= 255

	# run the model
	res_arr = model.predict(np.asarray([img_arr]))
	res = np.argmax(res_arr)
	return res
