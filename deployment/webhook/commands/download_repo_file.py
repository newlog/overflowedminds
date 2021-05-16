import argparse
import base64
import os
from pathlib import Path

# https://ghapi.fast.ai/
from ghapi.all import GhApi


def download_file(owner: str, repo: str, repo_filepath: str, out_filepath: str, ref: str):
    print(f"Downloading {repo_filepath} from {owner}/{repo}...")
    api = GhApi(token=os.environ['GITHUB_TOKEN'])
    res = api.repos.get_content(owner=owner, repo=repo, path=repo_filepath, ref=ref)
    file_content = base64.b64decode(res.content)

    out_filepath = Path(out_filepath).resolve()
    if not out_filepath.exists():
        with open(out_filepath, "wb+") as f:
            f.write(file_content)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("owner", help="Owner of the repo")
    parser.add_argument("repo", help="Name of the repo")
    parser.add_argument("file", help="Path and file name of the file you want to download")
    parser.add_argument("out_filepath", help="Output path and filename. e.g. foo/bar.txt")
    parser.add_argument("--ref", help="The name of the commit/branch/tag. Default: the repository’s default branch",
                        default=None)
    args = parser.parse_args()
    download_file(args.owner, args.repo, args.file, args.out_filepath, args.ref)