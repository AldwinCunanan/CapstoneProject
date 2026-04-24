# Animal adoption API (Final project)

This is a RESTful API for managing an animal adoption system. It allows users to view animals, apply for adoption, and receive notifications when new animals match their preferences.

The system includes role-based access control for administrators and staff, and uses Firebase for authentication and Firestore as the database.

## Features

- Animal management
- Adopter management
- Adoption applications
- Notification system (new component)
- Role-based authentication and authorization
- API documentation using Swagger/OpenAPI

## Notification System (Advanced Feature)

A notification system was implemented to automatically notify adopters when a new animal matches their preferred species.

- Triggered when a new animal is created
- Matches adopters based on `preferredSpecies`
- Stores notifications in Firestore
- Users can retrieve and mark notifications as read

## Installation

1. Clone the repository:
git clone https://github.com/AldwinCunanan/CapstoneProject

2. Install dependencies
npm init -y
npm install typescript ts-node @types/node --save-dev
npm install express
npm install @types/express --save-dev
npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
npm install morgan @types/morgan
npm install firebase-admin
npm install joi
npm install @types/joi --save-dev
npm install swagger-ui-express swagger-jsdoc
npm install -D @redocly/cli
npm install dotenv
npm install helmet
npm install cors

3. Create your .env file

4 Start server
- npm start
- api runs at http://localhost:3000

## API Base URL

http://localhost:3000/api/v1

## API Documentation

Swagger UI:
http://localhost:3000/api-docs

Deployed Documentation:
https://aldwincunanan.github.io/CapstoneProject/

## Authentication & Authorization

This API uses Firebase Authentication.

Roles:
- admin
- staff
- user

Access control is enforced using middleware to protect routes.

## Example Endpoints

### Animals
- GET /animals
- POST /animals
- PUT /animals/:id
- DELETE /animals/:id

### Adopters
- POST /adopters
- GET /adopters/:id
- PUT /adopters/:id
- DELETE /adopters/:id

### Applications
- POST /applications
- GET /applications
- PUT /applications/:id
- DELETE /applications/:id

### Notifications
- GET /notifications
- PUT /notifications/:id/read

## Testing

Tested using Postman and Swagger UI.

Critical flows tested:
- Create animal, adopter, applications
- Apply for adoption
- Role-based access control