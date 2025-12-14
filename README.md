# Setup Instructions

## Prerequisites
- Node.js
- MongoDB

## Environment Configuration

Create a `.env` file in the `Backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/fitplanhub
JWT_SECRET=your_secret_key
```

## Running the Application

### Backend

```bash
cd Backend
npm install
npx nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Reference

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get current user profile

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:planId` - Get plan details
- `POST /api/plans` - Create a plan (Trainer only)
- `PUT /api/plans/:planId` - Update a plan (Trainer only)
- `DELETE /api/plans/:planId` - Delete a plan (Trainer only)

### Subscriptions
- `POST /api/subscriptions/:planId` - Subscribe to a plan
- `GET /api/subscriptions/my` - Get user subscriptions

### Trainers
- `GET /api/trainers/:trainerId/profile` - Get trainer profile
- `POST /api/trainers/:trainerId/follow` - Follow a trainer
- `DELETE /api/trainers/:trainerId/unfollow` - Unfollow a trainer
- `GET /api/trainers/following` - Get followed trainers

### Feed
- `GET /api/feed` - Get user feed

## Testing

A `postman_collection.json` file is included in the root directory. This collection is AI-generated to facilitate endpoint testing and accelerate development. It includes pre-configured requests for all API routes with automatic token handling and dummy data.

## Database Schemas

### User
- `name`: String
- `email`: String (Unique)
- `password`: String
- `role`: String ('user' | 'trainer')

### Plan
- `title`: String
- `description`: String
- `price`: Number
- `durationInDays`: Number
- `trainerID`: ObjectId (Ref: User)

### Subscription
- `userId`: ObjectId (Ref: User)
- `planId`: ObjectId (Ref: Plan)

### TrainerFollow
- `userId`: ObjectId (Ref: User)
- `trainerId`: ObjectId (Ref: User)
