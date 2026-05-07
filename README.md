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
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/923ea447-9367-4bcf-b4ad-24046da6852e" />

<img width="1902" height="906" alt="image" src="https://github.com/user-attachments/assets/0692160e-8eba-4539-98f4-2033883dc04f" />

<img width="1908" height="908" alt="image" src="https://github.com/user-attachments/assets/ffa91d7c-eb0d-43e4-bfa6-8d851d66d1ae" />

<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/7cdd2b4f-4b8a-4635-a52d-b60ce82ea9b1" />

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
     fig.js

    
    
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

