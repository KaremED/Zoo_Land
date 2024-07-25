from typing import Union, Tuple
import io

from fastapi import FastAPI, UploadFile, File
from PIL import Image

from aimodel.animal_detect import AnimalDetect

app = FastAPI(
    root_path="/zoo_land"
)


@app.post("/process/image")
async def process_image(file: UploadFile = File(...)) -> Tuple:
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    animal_detect = AnimalDetect()
    value = animal_detect.img_proccess(image)
    return value
    

    ## add the image processing here


