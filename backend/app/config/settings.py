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

    HOST = os.getenv("HOST")
    PORT = int(os.getenv("BAK_PORT"))
    FRONT_PORT = int(os.getenv("FNT_PORT"))


settings = Settings()
