FROM node:8.1
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install && npm install phantomjs
ENV PATH="/app/node_modules/.bin:${PATH}"
CMD ["/bin/bash"]