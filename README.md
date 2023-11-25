# Welcome to ML model loader

## Getting started
- Need pipenv to install packages
- Create a folder called `.venv` in the root folder
- Once installed pipenv, run `pipenv install`, this should install the needed packages into the environment folder

### Needed packages that will be installed
- tensorflow: version 2.15.0
- numpy: version 1.26.2
- cv2: version 4.8.1 # note that this is also called 'opencv-python'
- Flask
- python version: 3.10.7

## Run the server
- `flask run`, this will run the flask server on your locals, and you can use the route `/predict` using POST method to run the model

### How to test the route?
- Download postman
- Choose POST request and define the host and route in therequest URL
- Go to the body tab and choose form-data, hover over key and choose file of the image
- This will place the file in the value section, and name the key `image`