import io
#imported api from fastapi and imported 
from fastapi import FastAPI, HTTPException, UploadFile, File
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

from aimodel.animal_detect import AnimalDetect
from aimodel.animal_info import AnimalInfo
#this the root that fastapi to use to fetch a method or something else
app = FastAPI(
    root_path="/zoo_land"
)
#
#let you share the file to the server to let anyone on the same network open the file
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process/image")
async def process_image(file: UploadFile = File(...)) -> AnimalInfo:
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        animal_detect = AnimalDetect()
        value = animal_detect.img_proccess(image)
        return value
    except Exception as e:
          raise HTTPException(status_code=500, detail=str(e))
    

    ## add the image processing here

#@app.get("/")
