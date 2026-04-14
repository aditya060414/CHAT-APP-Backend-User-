# User Service - Installation

This service handles user authentication and profile management using Express, MongoDB, Redis, and RabbitMQ.

## Installations

Run the following commands in the `backend/user` directory:

```bash
# Install all dependencies
npm install
```

### Manual Installation (if starting from scratch)
```bash
# Core
npm i express dotenv mongoose bcryptjs amqplib redis jsonwebtoken cors

# Dev Dependencies
npm i -D typescript nodemon concurrently @types/express @types/dotenv @types/mongoose @types/amqplib @types/redis @types/jsonwebtoken @types/cors @types/bcryptjs
```

## Environment Variables

Create a `.env` file in the `backend/user` directory:

```env
PORT=5000
MONGO_URL=your_mongodb_url
REDIS_URL=your_redis_url
RABBITMQ_HOST=localhost
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin123
JWT_SECRET=your_secret_key
```

## Running the Service

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## RabbitMQ Setup

Make sure RabbitMQ is running. You can use Docker:
```bash
docker run -d --hostname rabbitmq-host --name rabbitmq-container -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin123 -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5ZGNjYjU4NmE1N2VlYWFmNDNjY2ZjOSIsIm5hbWUiOiJBZGl0eWEgU2luZ2giLCJlbWFpbCI6InNpbmdoLmFkaXR5YS40NDYxOEBnbWFpbC5jb20iLCJhdmF0YXIiOiIiLCJpc09ubGluZSI6ZmFsc2UsInNvY2tldElkIjpudWxsLCJmcmllbmRzIjpbXSwibGFzdFNlZW4iOiIyMDI2LTA0LTEzVDEwOjU0OjE2LjE5MVoiLCJjcmVhdGVkQXQiOiIyMDI2LTA0LTEzVDEwOjU0OjE2LjE5NVoiLCJ1cGRhdGVkQXQiOiIyMDI2LTA0LTEzVDExOjQ5OjU2LjQ3OFoiLCJfX3YiOjB9LCJpYXQiOjE3NzYxNjM1NDQsImV4cCI6MTc3NzQ1OTU0NH0.KoX3RzUY5phuhBOacPMlMPDnWxANzU9591WGKeg8kLo






eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBZGl0eWFrdW1hciIsImVtYWlsIjoiYWRpdHlha3VtYXI2MjcxOUBnbWFpbC5jb20iLCJhdmF0YXIiOiIiLCJpc09ubGluZSI6ZmFsc2UsInNvY2tldElkIjpudWxsLCJmcmllbmRzIjpbXSwiX2lkIjoiNjlkZTFjMmVhOTQ1N2U4N2FjOWM2NzUyIiwibGFzdFNlZW4iOiIyMDI2LTA0LTE0VDEwOjUxOjI2LjcyMloiLCJjcmVhdGVkQXQiOiIyMDI2LTA0LTE0VDEwOjUxOjI2Ljc0NVoiLCJ1cGRhdGVkQXQiOiIyMDI2LTA0LTE0VDEwOjUxOjI2Ljc0NVoiLCJfX3YiOjB9LCJpYXQiOjE3NzYxNjM4ODYsImV4cCI6MTc3NzQ1OTg4Nn0.OJZuQmRN66t9TqvFj6hH-3qfOdKBvagVqBPSUNiOvRg