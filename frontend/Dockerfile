FROM node:lts-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./ 

# Install dependencies
RUN npm install

# Copy source files
COPY . .


# Switch to non-root user
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]