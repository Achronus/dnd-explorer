import argparse
import uvicorn


def start(env_mode: str = "dev") -> None:
    """Start the server."""
    dev_mode = True if env_mode == "dev" else False

    uvicorn.run("app.main:app", reload=dev_mode)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Start the server.")
    parser.add_argument(
        "-e", "--env", type=str, default="dev", choices=["dev", "prod"], required=True
    )

    args = parser.parse_args()
    start(args.env)
