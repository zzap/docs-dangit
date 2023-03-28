FROM nginx:latest

COPY ./ssl /etc/nginx/ssl
WORKDIR /etc/nginx
#
# This requires to have these commands run inside the nginx-folder to create the CA certificates
#
# > openssl genrsa -out ssl/ca.key 4096; \
# > openssl req -x509 -new -nodes -subj "/C=de/O=docs/CN=development certificates;" -key ssl/ca.key -sha512 -days 3650 -out ssl/ca.crt;
#
RUN apt-get update && apt-get install -y openssl && \
    openssl genrsa -out "ssl/docs.dangit.key" 2048 && \
    openssl req -new -subj "/C=de/O=docs/CN=docs.dangit" -key "ssl/docs.dangit.key" -out "ssl/docs.dangit.csr" && \
    openssl x509 -req -in "ssl/docs.dangit.csr" -extfile "ssl/docs.dangit.ext" -CA "ssl/ca.crt" -CAkey "ssl/ca.key" -CAcreateserial -out "ssl/docs.dangit.crt" -days=365 -sha512 && \
    rm "ssl/docs.dangit.csr" "ssl/ca.key" && \
    apt-get remove -y openssl

WORKDIR /var/www/docs_dangit/public



