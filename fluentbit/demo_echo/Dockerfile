FROM node:latest

RUN sh -c 'curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh'

#keep all but the last 10 lines of the default config
RUN tac /etc/fluent-bit/fluent-bit.conf |sed '1,10d'|tac > /etc/fluent-bit/fluent-bit.conf 

RUN touch /etc/fluent-bit/fluent-bit-custom.conf
RUN touch /etc/fluent-bit/fluent-bit-parsers-custom.conf

RUN echo "@INCLUDE fluent-bit-custom.conf" >> /etc/fluent-bit/fluent-bit.conf
RUN echo "@INCLUDE fluent-bit-parsers-custom.conf" >> /etc/fluent-bit/parsers.conf

COPY echo-app /app
WORKDIR /app
ENTRYPOINT  ["/bin/sh","-c", "nohup /opt/fluent-bit/bin/fluent-bit -d -c /etc/fluent-bit/fluent-bit.conf &  npm i && npm run start"]

