

import numpy as np
from pydantic import Json
import json
from typing import Tuple

import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

from aimodel.animal_info import AnimalInfo

class AnimalDetect: 
    def __init__(self) -> None:
        self.model = MobileNetV2(weights="imagenet")

    def img_proccess(self, img: Image) -> AnimalInfo:
        img = img.resize((224, 224))
        img_array = np.array(img)
        img_array = img_array[:,:,:3]
        img_array = np.expand_dims(img_array, axis=0)  
        img_array = preprocess_input(img_array)
        preds = self.model.predict(img_array)
        label = decode_predictions(preds)
        animal: Tuple[str, str, float] = label[0][0]
        animal_name = animal[1].capitalize().replace('_',' ')
        return AnimalInfo(name=animal_name, 
                          prob=float(animal[2]), 
                          description=self.get_description(animal_name))

    def get_description(self, animal_name: str) -> str:
        
        with open("./data.json", '+br') as json_file:
            data = json.load(json_file)
            description = data.get(animal_name, {
                'description': 'We cannot find this animal description.'
            })["description"]

        return description
#image