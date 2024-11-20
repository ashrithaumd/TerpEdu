import pytest
from flask import Flask
from routes.student_route import student_bp
from unittest.mock import patch


@pytest.fixture
def client():
    # Set up Flask test client
    app = Flask(__name__)
    app.register_blueprint(student_bp, url_prefix='/student')
    with app.test_client() as client:
        yield client


@patch('dao.student_dao.StudentDao.get_enrolled_courses')
def test_get_enrolled_courses(mock_get_enrolled_courses, client):
    # Mocking DAO method to return test data
    mock_get_enrolled_courses.return_value = [
        (1, "Math 101", "Basic Mathematics", 3, "Math Dept", "Fall 2024", True),
        (2, "Physics 101", "Intro to Physics", 4, "Physics Dept", "Fall 2024", True),
    ]

    # Perform a GET request to the endpoint
    response = client.get('/student/enrolled-courses', query_string={"user_id": "1"})
    
    # Assertions
    assert response.status_code == 200
    assert response.json == {
        "enrolled_courses": [
            (1, "Math 101", "Basic Mathematics", 3, "Math Dept", "Fall 2024", True),
            (2, "Physics 101", "Intro to Physics", 4, "Physics Dept", "Fall 2024", True),
        ]
    }


@patch('dao.student_dao.StudentDao.get_course_materials')
def test_get_course_materials(mock_get_course_materials, client):
    # Mocking DAO method to return test data
    mock_get_course_materials.return_value = [
        (1, "PDF", "Syllabus", "2024-09-01", "/path/to/syllabus.pdf"),
        (2, "Video", "Lecture 1", "2024-09-02", "/path/to/lecture1.mp4"),
    ]

    # Perform a GET request to the endpoint
    response = client.get('/student/course-materials', query_string={"course_id": "101"})
    
    # Assertions
    assert response.status_code == 200
    assert response.json == {
        "course_materials": [
            (1, "PDF", "Syllabus", "2024-09-01", "/path/to/syllabus.pdf"),
            (2, "Video", "Lecture 1", "2024-09-02", "/path/to/lecture1.mp4"),
        ]
    }


@patch('dao.student_dao.StudentDao.get_course_info')
def test_get_course_info(mock_get_course_info, client):
    # Mocking DAO method to return test data
    mock_get_course_info.return_value = (
        101, "Math 101", "Basic Mathematics", 3, "Math Dept", "Fall 2024", True
    )

    # Perform a GET request to the endpoint
    response = client.get('/student/course-info', query_string={"course_id": "101"})
    
    # Assertions
    assert response.status_code == 200
    assert response.json == {
        "course_info": (101, "Math 101", "Basic Mathematics", 3, "Math Dept", "Fall 2024", True)
    }
