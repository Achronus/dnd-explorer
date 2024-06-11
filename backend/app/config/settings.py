import os

from dotenv import load_dotenv


load_dotenv(".env.local")


class Settings:
    """A storage container for storing configuration variables."""

    DB_URL = os.getenv("DATABASE_URL")
    DB_NAME = os.getenv("DB_NAME")
    DB_SPELLS_COLLECTION = os.getenv("DB_SPELLS_COLLECTION_NAME")

    HOST = os.getenv("HOST")
    PORT = int(os.getenv("PORT"))

    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")


settings = Settings()
