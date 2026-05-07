# Electronic Voting System (EVS)

A secure, scalable, and role-based **Electronic Voting System** developed using **React, Spring Boot, and MySQL**.

The system digitizes the traditional voting process by enabling secure voter registration, election management, candidate handling, and online vote casting through a centralized web platform.

The project is designed to provide **transparency, security, and efficiency** in election management while reducing manual paperwork and human errors. It supports multiple user roles including **Admin, Electoral Officer (EO), and Voter**, each with dedicated functionalities and controlled access.

---

# 🎯 Project Objective

The main objective of this project is to replace the traditional paper-based voting system with a secure and automated digital voting platform.

## The system aims to:

- Provide secure online voting
- Reduce manual election workload
- Improve transparency in vote counting
- Enable fast result generation
- Prevent unauthorized access using role-based authentication
- Manage voter registration and approval efficiently

---

# 🏗️ System Architecture

The project follows a full-stack client-server architecture:

- **Frontend:** React + Vite
- **Backend:** Spring Boot REST API
- **Database:** MySQL
- **Communication:** RESTful APIs using Axios

---

# 🗂️ Project Structure

```text
Electronic_voting_System/
├── evs-backend/         # Spring Boot Backend
│   ├── src/main/java/com/evs/evs_backend/
│   │   ├── entity/          # Database Entities
│   │   ├── repository/      # JPA Repositories
│   │   ├── service/         # Business Logic
│   │   └── controller/      # REST Controllers
│   └── pom.xml
│
└── evs-frontend/        # React Frontend
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
    └── vite.con
    
    
    🔄 Voter ID Approval Workflow

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
    
    
    
    fig.js
