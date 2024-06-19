import os

from utils.fileloader import FileLoader


class Settings:
    """A storage container for storing configuration variables."""

    __fileloader = FileLoader()

    DIRPATHS = __fileloader.DIRPATHS
    FILEPATHS = __fileloader.FILEPATHS

    DB_URL = os.getenv("DB_URL")
    DB_NAME = "spells"
    DB_SPELLS_COLLECTION = "detail"


settings = Settings()
