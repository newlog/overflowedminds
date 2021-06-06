FROM 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds_production_frotend AS frontend

FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system django \
    && adduser --system --ingroup django django

# Requirements are installed here to ensure they will be cached.
COPY ./backend/requirements /requirements
RUN pip install --no-cache-dir -r /requirements/production.txt \
    && rm -rf /requirements

COPY --chown=django:django ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint


COPY --chown=django:django ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start
COPY --chown=django:django ./backend /app

# Copy frontend build directory to the backend project inside the django image. The settings.py does the rest.
RUN mkdir -p /app/overflowedminds_backend/frontend/build && chown -R django:django /app/overflowedminds_backend/frontend/build
COPY --from=frontend --chown=django:django /app/build/ /app/overflowedminds_backend/static

USER django

WORKDIR /app

ENTRYPOINT ["/entrypoint"]
