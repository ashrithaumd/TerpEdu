Heruko Deployment link :
https://terpedu-0949ddb44d51.herokuapp.com/

User Id and Password's 
Student id: 102
password: Abc@1234
Admin id: 103
password: Abc@1234
Instructor id: 107
password: Abc@1234

Installation Guide
Installation Guide - SQLite Migration

Prerequisites
- Node.js (LTS version)
- Python 3.x
- pip (Python package manager)
- Virtual Environment for Python (Recommended)
- SQLite (for database storage)
- Flask
- Flask-Cors
- Flask-Migrate
- Flask-SQLAlchemy
- SQLAlchemy
- Werkzeug
- gunicorn

Backend Setup (Python and Flask)

1. Clone the Repository:
   bash
   git clone <TerpEdu>
   cd TerpEdu/backend


2. Set Up Virtual Environment:
   bash
   python -m venv venv
   source venv/bin/activate   # On Windows use: venv\Scripts\activate


3. Install Required Packages:

   pip install -r requirements.txt

4. Run the File:
   cd backend
   backend - python -m flask run
