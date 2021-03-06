# Dot Map

### Flatiron Mod 5 Solo Project

## Overview 
- Dot Map is an image sharing platform that uses Image Recognition to find and 
locates where the images were taken
- Watch a demo [here](https://vimeo.com/458211076)

## Functionality 
- Utilized the [Mapbox GL React Wrapper](https://github.com/visgl/react-map-gl)
- Analyze image tags and location information 
- Image Recognition locates landmarks and places marker on map [Google Vision API](https://github.com/GoogleCloudPlatform/cloud-vision)
- Display 3D model on the Map ([Model Viewer](https://github.com/google/model-viewer) for the placement of model and [Google Poly](https://github.com/googlevr/poly-sample-web) for the model itself)
- Sourced information on the lankmark through [Wikimedia API](https://github.com/wikimedia)
- Stored User Images on [Cloudinary](https://cloudinary.com/)

## Future Plans 
- Currently the models are being hard-coded to display since it was difficult to find the correct models through searching the google poly models that work directly with model viewer and I wanted to focus more on the display of the models than the search functionality itself - future plans would be to get this working

- I started progressing dot map into an augmented reality platform and hoping to tie in user images with 3d models so that the images can inform an even greater experience than the images themselves

- Backend is hidden due to expensive cost of Google API Hosting
