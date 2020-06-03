FROM node:13
MAINTAINER Lu Pa <admin@tedic.org>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update \
        && apt-get install -y \
                curl \
                git \
        && apt-get clean

WORKDIR /usr/src/app

ADD . .

COPY docker-entrypoint.sh /
