import os

from app.utils.fileloader import FileLoader


class Settings:
    """A storage container for storing configuration variables."""

    DB_NAME = "demo"
    COLLECTION_DEMO = "demo_collection"

    __fileloader = FileLoader()

    DIRPATHS = __fileloader.DIRPATHS
    FILEPATHS = __fileloader.FILEPATHS

    DB_URL = os.getenv("DATABASE_URL")
    HOST = os.getenv("HOST")
    PORT = int(os.getenv("PORT"))


settings = Settings()
