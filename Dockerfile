FROM node:22-alpine

ARG VITE_PUBLIC_HOST

WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies using yarn
RUN yarn install

ENV VITE_PUBLIC_HOST=$VITE_PUBLIC_HOST

# Build the pragma package
RUN yarn workspace @jsdbx/pragma build

# Build the web application
RUN yarn workspace web build

# Copy the web dist content to server's public directory
RUN mkdir -p ./public && cp -r ./apps/web/dist/* ./public/

# Build the server application
RUN yarn workspace @jsdbx/server build

# Expose the server port
EXPOSE 3000

# Start the server application
CMD ["node", "apps/server/dist/index.mjs"]