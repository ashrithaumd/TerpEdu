TerpEdu
=======

TerpEdu is an educational platform built to help students and instructors manage course enrollments, materials, and communication effectively. This repository includes both the backend and frontend implementations of TerpEdu.

Table of Contents
-----------------

*   [Overview](#overview)
*   [Getting Started](#getting-started)
*   [Prerequisites](#prerequisites)
*   [Database Setup](#database-setup)
*   [Installation](#installation)
*   [Running the Application](#running-the-application)
*   [Project Structure](#project-structure)
*   [Dependencies](#dependencies)
*   [Usage](#usage)
*   [Contributing](#contributing)
*   [License](#license)

Overview
--------

TerpEdu is designed to facilitate educational activities, such as managing courses, enrollments, announcements, and assignments. It supports three types of users: Students, Instructors, and Admins, each with distinct roles and responsibilities.

Getting Started
---------------

Follow the instructions below to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
-------------

*   **Node.js**: v14.x or later
*   **npm**: v6.x or later
*   **Python**: v3.8 or later
*   **MySQL**: v5.7 or later

Ensure you have the following tools installed before proceeding:

*   [Node.js and npm](https://nodejs.org/)
*   [Python](https://www.python.org/downloads/)
*   [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

Database Setup
--------------

### Exporting the Database

To export the database, use the following command:

    mysqldump -u user_name -p terpedu > database_dump.sql

### Importing the Database

To import the database dump into your MySQL server, use this command:

    mysql -u user_name -p terpedu < database_dump.sql

### Steps for Import:

1.  Open your terminal or command prompt.
2.  Ensure the `database_dump.sql` file is in your current working directory.
3.  Run the import command shown above.
4.  Provide your MySQL password when prompted.

Installation
------------

### Clone the Repository

To clone this repository, run:

    git clone https://github.com/ashrithaumd/TerpEdu.git
    cd TerpEdu
    

### Backend Setup

1.  Navigate to the backend directory:
    
        cd backend
    
2.  Create a virtual environment and activate it:
    
        python -m venv venv
        source venv/bin/activate  # On Windows: venv\Scripts\activate
    
3.  Install the Python dependencies:
    
        pip install -r requirements.txt
    
4.  Set up the database connection in the `app.py` file by updating the `SQLALCHEMY_DATABASE_URI` to match your MySQL server configuration.

### Frontend Setup

1.  Navigate to the frontend directory:
    
        cd ../frontend
    
2.  Install the npm dependencies:
    
        npm install
    
3.  Build the React application:
    
        npm run build