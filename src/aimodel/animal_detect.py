

import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions


class AnimalDetect: 
    def __init__(self) -> None:
        self.model = MobileNetV2(weights="imagenet")
        pass

    def img_proccess(self, img: Image):
        img = img.resize((224, 224))
        img_array = np.array(img)
        img_array = img_array[:,:,:3]
        img_array = np.expand_dims(img_array, axis=0)  
        img_array = preprocess_input(img_array)
        preds = self.model.predict(img_array)
        label = decode_predictions(preds)

        return label[0][0]


