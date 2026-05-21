# Electronic Voting System (EVS)

Live Demo: https://electronic-voting-system-orpin.vercel.app  

Backend API: https://electronicvotingsystem-production.up.railway.app

A secure, scalable, and role-based Electronic Voting System developed using React, Spring Boot, and MySQL.

The system digitizes the traditional voting process by enabling secure voter registration, election management, candidate handling, and online vote casting through a centralized web platform.

The project is designed to provide transparency, security, and efficiency in election management while reducing manual paperwork and human errors.

It supports multiple user roles including:

- Admin
- Electoral Officer (EO)
- Voter

Each role has dedicated functionalities with controlled access.

---

# Project Objective

The main objective of this project is to replace the traditional paper-based voting system with a secure and automated digital voting platform.

## The system aims to:

- Provide secure online voting
- Reduce manual election workload
- Improve transparency in vote counting
- Enable fast result generation
- Prevent unauthorized access using role-based authentication
- Manage voter registration and approval efficiently

---

# Features

- Secure Login & Authentication
- Role-Based Access Control
- Online Vote Casting
- Election Management
- Candidate Management
- Party Management
- Voter Registration Workflow
- Voter ID Approval System
- Real-Time Result Generation
- REST API Integration
- Responsive User Interface
- Secure Backend APIs
- Database-Driven Architecture

---

# System Architecture

The project follows a full-stack client-server architecture:

- Frontend: React + Vite
- Backend: Spring Boot REST API
- Database: MySQL
- Communication: RESTful APIs using Axios

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- React Router DOM
- CSS

## Backend
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

## Database
- MySQL

## Deployment
- Vercel (Frontend)
- Railway (Backend)

---

# Screenshots

<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/923ea447-9367-4bcf-b4ad-24046da6852e" />

<br>

<img width="1902" height="906" alt="image" src="https://github.com/user-attachments/assets/0692160e-8eba-4539-98f4-2033883dc04f" />

<br>

<img width="1908" height="908" alt="image" src="https://github.com/user-attachments/assets/ffa91d7c-eb0d-43e4-bfa6-8d851d66d1ae" />

<br>

<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/7cdd2b4f-4b8a-4635-a52d-b60ce82ea9b1" />

---

# Project Structure

```text
Electronic_voting_System/
├── evs-backend/                 # Spring Boot Backend
│   ├── src/main/java/com/evs/evs_backend/
│   │   ├── entity/              # Database Entities
│   │   ├── repository/          # JPA Repositories
│   │   ├── service/             # Business Logic
│   │   └── controller/          # REST Controllers
│   └── pom.xml
│
└── evs-frontend/                # React Frontend
    ├── src/
    │   ├── pages/
    │   │   ├── admin/
    │   │   ├── eo/
    │   │   ├── voter/
    │   │   └── auth/
    │   ├── components/
    │   ├── context/
    │   └── api/
    ├── package.json
    └── vite.config.js
```

---

# Voter ID Approval Workflow

```text
Voter submits request
        ↓
passedstatus = 1

Admin reviews application
        ↓
passedstatus = 2

Electoral Officer verifies request
        ↓
passedstatus = 3

Voter ID generated successfully
        ↓
approvedstatus = 1
```

---

# Live Deployment

| Service | Link |
|----------|------|
| Frontend | https://electronic-voting-system-orpin.vercel.app |
| Backend API | https://electronicvotingsystem-production.up.railway.app |

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/anushastefyj/Electronic_voting_System.git
```

---

## Frontend Setup

```bash
cd evs-frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd evs-backend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# User Roles & Responsibilities

## Admin
- Manage elections
- Add political parties
- Add candidates
- Approve voter requests
- Publish election results

## Electoral Officer (EO)
- Verify voter applications
- Generate voter IDs
- Reject invalid requests

## Voter
- Register account
- Request voter ID
- View upcoming elections
- Cast vote securely
- View election results

---

# API Communication

The frontend communicates with the backend using:

- Axios
- REST APIs
- JSON requests/responses

Example:

```javascript
api.post("/auth/login", data)
```

---

# Security Features

- Role-Based Authentication
- Protected API Endpoints
- Secure Vote Submission
- Controlled Access Management
- Database Validation
- Authentication-based Authorization

---

# Future Enhancements

- OTP Verification
- Aadhaar Integration
- Blockchain-based Vote Storage
- AI Fraud Detection
- Real-Time Analytics Dashboard
- Multi-language Support
- Email Notifications
- Mobile Application Support

---

# Support

If you like this project, give it a star on GitHub.
