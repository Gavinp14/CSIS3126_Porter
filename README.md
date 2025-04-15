# Trainer Pro
This project contains a **React frontend** and a **Flask backend**. The backend uses a **virtual environment** and connects to a **local MySQL server** for data storage.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Python 3.9+](https://www.python.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/)

---

## Installation

### Clone the Repository

git clone https://github.com/gavinp14/CSIS3126_Porter
cd CSIS3126_Porter

### Backend Setup (Flask)
bash
cd backend
source venv/bin/activate   # On Windows use: venv\Scripts\activate
python app.py 

### Frontend Setup (React)
cd frontend
npm start

## Running Tests
cd backend
source venv/bin/activate   # On Windows use: venv\Scripts\activate
python tests.py

