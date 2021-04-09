FROM traefik:v2.4.7
RUN mkdir -p /etc/traefik/acme \
  && touch /etc/traefik/acme/acme.json \
  && chmod 600 /etc/traefik/acme/acme.json
COPY ./compose/production/traefik/traefik.yml /etc/traefik

COPY ./compose/production/traefik/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/production/traefik/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

# Execute command on container to replace traefik.yml config file for Django admin panel route using env vars
ENTRYPOINT ["/entrypoint"]
