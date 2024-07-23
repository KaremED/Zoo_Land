from typing import Union

from fastapi import FastAPI, UploadFile, File

app = FastAPI(
    root_path="/zoo_land"
)


@app.post("/process/image")
async def process_image(file: UploadFile = File(...)):
    contents = await file.read()

    ## add the image processing here


