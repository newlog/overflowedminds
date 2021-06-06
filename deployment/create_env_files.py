import os
from pathlib import Path


def create_env_files():
    env_vars_env_files = [('DJANGO_ENV', '.django'), ('TRAEFIK_ENV', '.traefik'), ('POSTGRES_ENV', '.postgres')]
    env_dir = Path(__file__).resolve().parent.parent / "backend" / ".envs" / ".production"
    for env_var_env_file in env_vars_env_files:
        django_env_file_contents = os.getenv(env_var_env_file[0])
        env_filename = env_dir / env_var_env_file[1]
        os.makedirs(env_dir, exist_ok=True)
        if not env_filename.exists():
            with open(env_filename, "w") as f:
                f.write(django_env_file_contents)


if __name__ == '__main__':
    os.environ['DJANGO_ENV'] = 'DJANGO'
    os.environ['TRAEFIK_ENV'] = 'TRAEFIK'
    os.environ['POSTGRES_ENV'] = 'POSTGRES'
    create_env_files()
