import os

from app.utils.fileloader import FileLoader


class Settings:
    """A storage container for storing configuration variables."""

    __fileloader = FileLoader()

    DIRPATHS = __fileloader.DIRPATHS
    FILEPATHS = __fileloader.FILEPATHS

    DB_URL = os.getenv("DATABASE_URL")
    DB_NAME = os.getenv("DB_NAME")
    DB_SPELLS_COLLECTION = os.getenv("DB_SPELLS_COLLECTION_NAME")

    HOST = os.getenv("HOST")
    PORT = int(os.getenv("PORT"))


settings = Settings()
