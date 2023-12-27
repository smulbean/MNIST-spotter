# Welcome to ML model loader

## Getting started
### For backend
- `cd` into backend folder
- Need pipenv to install packages
- Create a folder called `.venv` in the root folder
- Once installed pipenv, run `python -m pipenv install`, this should install the needed packages into the environment folder

### For frontend
- `cd` into frontend folder
- `npm install` to install dependancies
- `npm start` to start the frontend, ensure backend is running as well

### Needed packages that will be installed
- tensorflow: version 2.15.0
- numpy: version 1.26.2
- cv2: version 4.8.1 # note that this is also called 'opencv-python'
- Flask
- python version: 3.10.7

## Run the server
- `python -m flask run`, this will run the flask server on your locals, and you can use the route `/predict` using POST method to run the model

### How to test the route?
- Download postman
- Choose POST request and define the host and route in therequest URL
- Go to the body tab and choose form-data, hover over key and choose file of the image
- This will place the file in the value section, and name the key `image`