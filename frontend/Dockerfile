FROM node:13.12.0-alpine

ENV PORT 3000

# Create app directory
WORKDIR /code/frontend

# Installing dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
# RUN npm run build
EXPOSE 3000

# Running the app
CMD ["npm", "run", "build"]