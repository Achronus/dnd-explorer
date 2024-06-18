import os

from dotenv import load_dotenv
from utils.fileloader import FileLoader


load_dotenv(".env.local")


class Settings:
    """A storage container for storing configuration variables."""

    DB_URL = os.getenv("DATABASE_URL")
    DB_NAME = os.getenv("DB_NAME")
    DB_SPELLS_COLLECTION = os.getenv("DB_SPELLS_COLLECTION_NAME")

    __fileloader = FileLoader()

    DIRPATHS = __fileloader.DIRPATHS
    FILEPATHS = __fileloader.FILEPATHS

    HOST = os.getenv("HOST")
    PORT = int(os.getenv("BAK_PORT"))


settings = Settings()
