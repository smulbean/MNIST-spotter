import tensorflow as tf
import numpy

# dataset
mnist = tf.keras.datasets.mnist

# organizing data (only using test data here)
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.

# testing the model's accuracy
model = tf.keras.models.load_model("model.h5")
model.evaluate(x_test, y_test, verbose=2)
