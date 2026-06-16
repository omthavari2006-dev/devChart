# DevChart - Club Collaboration Platform

DevChart is a web-based collaboration platform designed for clubs and teams to manage tasks efficiently. It provides team management, task assignment, member management, and a Kanban-style workflow to organize work into different stages.

The platform helps teams coordinate activities, assign responsibilities, and track progress through an intuitive interface.


## Features Implemented

### Task Management
- Create tasks
- Delete tasks
- Update tasks
- Automatic priority generation based on deadlines
- Task checklist (subtasks)
- Automatic deletion of expired tasks

### Team Management
- Create teams
- Delete teams
- View team details
- Add members to teams
- Persistent member storage using MongoDB

### Team Assignment
- Assign tasks to specific teams
- Display assigned team information on task cards
- Support for common tasks without a team assignment

### Kanban Board
- To Do
- In Progress
- Done
- Move tasks between stages

### Notifications
- Toast notifications using Sonner


## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### Database
- MongoDB
- Mongoose

### Additional Libraries
- Sonner


## Setup Instructions

### Clone Repository

git clone https://github.com/omthavari2006-dev/devChart.git

### Install Dependencies

npm install

### Create Environment File

Create a .env.local file and add:

MONGODB_URI=your_mongodb_connection_string

### Run Development Server

npm run dev

Open:

http://localhost:3000



## Deployment Instructions

1. Push the latest code to GitHub.

2. Sign in to Vercel.

3. Import the GitHub repository.

4. Add the environment variable:

MONGODB_URI

5. Deploy the project.

6. Access the live application using the generated Vercel URL.




dashboard /kanban

![image alt](https://github.com/omthavari2006-dev/devChart/blob/b095c71768c064e75a2658420c81eddcefce3566/Screenshot%202026-06-16%20163647.png)
![image alt](https://github.com/omthavari2006-dev/devChart/blob/396a2b7fdb230bf3737cb10e59cee04902954ece/Screenshot%202026-06-16%20163728.png)

managing teams 


![image alt](https://github.com/omthavari2006-dev/devChart/blob/8e5317fc9d24aa006663a89ddf2ca2661353fe14/Screenshot%202026-06-16%20163748.png)
