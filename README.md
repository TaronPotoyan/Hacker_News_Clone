# Hacker_News_Clone

This is a Hacker News clone built using **React** for the frontend and **Express** for the backend. It mimics the functionality of the original Hacker News website (https://news.ycombinator.com/), allowing users to view, comment on, and submit stories. The app also features authentication and a RESTful API for interaction.

## Features
- **Main Page**: Displays top stories (Submit HN, Ask HN, Show HN) sorted by votes and comments.
- **Nested Comments**: Users can reply to stories and other comments.
- **Submit Stories**: Users can submit new stories with titles, URLs, and descriptions.
- **Authentication**: Users can log in and sign up to participate in submitting stories and commenting.
- **REST API**: A robust API for interaction with the data on the server.
- **User Profiles**: Users have a basic profile displaying their submission history.

## Technologies Used
- **Frontend**: 
  - React 18
  - React Router for navigation
- **Backend**: 
  - Node.js and Express.js
  - MongoDB for storing stories, comments, and user data
  - JWT (JSON Web Tokens) for authentication
  - bcrypt for password hashing
- **Database**: MongoDB (using Mongoose for schema and model management)

## Installation

### Prerequisites
- Node.js (v16.x or higher)
- MongoDB instance (locally or MongoDB Atlas)

### Clone the repository

```bash
git clone https://github.com/your-username/hacker-news-clone.git
cd hHacker-News-Clone
