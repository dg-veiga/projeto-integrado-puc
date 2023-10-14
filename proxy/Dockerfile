FROM nginx:alpine

WORKDIR /workspace

EXPOSE 80

EXPOSE 443

COPY . .

ENTRYPOINT ["/bin/sh", "docker-entrypoint.sh"]