FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y nginx
ADD ./nginx.conf /etc/nginx
COPY ./client /home/nginx_server/client
CMD ["nginx"]
