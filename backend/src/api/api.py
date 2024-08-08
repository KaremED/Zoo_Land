import io
#imported api from fastapi and imported 
from fastapi import FastAPI, HTTPException, UploadFile, File
from PIL import Image
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from aimodel.animal_detect import AnimalDetect
from aimodel.animal_info import AnimalInfo
#this the root that fastapi to use to fetch a method or something else
app = FastAPI(
    root_path="/zoo_land"
)
# Serve the index.html at the root URL
@app.get("/", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/index.html")

#Serve the about us page html + css
@app.get("/about.html", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/about.html")

@app.get("/about.css", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/about.css")

#Serve the Team Pictures
@app.get("/assets/Team/KaremED1.JPG", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../assets/Team/KaremED1.JPG")

@app.get("/assets/Team/Algamody.JPG", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../assets/Team/Algamody.JPG")

@app.get("/assets/Team/Moad.JPG", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../assets/Team/Moad.JPG")

@app.get("/assets/Team/Grada.JPG", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../assets/Team/Grada.JPG")

@app.get("/about.css", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/about.css")

# Serve the CSS file
@app.get("/index.css")
async def read_css():
    return FileResponse("../../frontend/index.css", media_type="text/css")

@app.get("/index.html")
async def read_css():
    return FileResponse("../../frontend/index.html")

# Serve the JS file
@app.get("/script.js")
async def read_js():
    return FileResponse("../../frontend/script.js", media_type="application/javascript")

@app.get("/assets/uploadimg.svg")
async def read_image1():
    image_path = "../../assets/uploadimg.svg"
    return FileResponse(image_path, media_type="image/svg+xml")


# Serve image files
@app.get("/assets/undoimg.svg")
async def read_image2():
    image_path = "../../assets/undoimg.svg"
    return FileResponse(image_path, media_type="image/svg+xml")


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
        return {"error": str(e)}
    


#Serve fonts
@app.get("/fonts/Fredoka-VariableFont_wdthwght.ttf", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/fonts/Fredoka-VariableFont_wdth,wght.ttf")

@app.get("/fonts/LydoraKids.ttf", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../../frontend/fonts/LydoraKids.ttf")
