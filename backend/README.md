# Docs.Dangit backend

This provides the basic backend for development.

A more sophisticated version needs to be created to also deploy docker-container

## Before starting

Create the Key and Cert for a Certification authority by calling the following commands on the CLI:

```bash
cd /path/to/backend/.docker/nginx/
openssl genrsa -out ssl/ca.key 4096;
openssl req -x509 -new -nodes -subj "/C=de/O=docs/CN=development certificates;" -key ssl/ca.key -sha512 -days 3650 -out ssl/ca.crt;
```

This will create the necessary files. You should import the CRT file as certification authority into your browser to not
get remarks that the website might be insecure.

## Usage

With a working docker-setup you can start the development environment via `docker compose up -d`.

This should download and create all the necessary information to get up and running.

You should also add the line `127.17.0.1 docs.dangit` to your `/etc/hosts` file to be able to resolve the docs.dangit
development website

Then you can point your browser to `https://docs.dangit` and enjoy
