import requests
import asyncio
import aiohttp


async def fetch(session: aiohttp.ClientSession, url: str) -> dict:
    """Fetch a single session item asynchronously."""
    async with session.get(url) as res:
        if res.status != 200:
            res.raise_for_status()

        return await res.json()


async def fetch_all(session, urls: dict[str, str]) -> list[dict]:
    """Create the tasks for multiple session requests."""
    tasks = [asyncio.create_task(fetch(session, url)) for url in urls]
    data = await asyncio.gather(*tasks)
    return data


def fetch_one(url: str) -> dict:
    """Fetch a single set of data from a URL."""
    res = requests.get(url)

    if res.status_code == 200:
        return res.json()

    raise requests.HTTPError(f"Request failed with status code: {res.status_code}.")
