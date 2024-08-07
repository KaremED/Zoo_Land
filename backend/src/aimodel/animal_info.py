import pydantic


from pydantic import BaseModel

class AnimalInfo(BaseModel):
    name: str = ''
    prob: float = 0
    AnimalType: str = ''
    description: str = ''