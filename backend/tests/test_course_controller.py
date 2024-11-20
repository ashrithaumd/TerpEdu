import unittest
from unittest.mock import patch, MagicMock
from flask import Flask
from controller.course_controller import CourseController
from dao.course_dao import CourseDao

class TestCourseController(unittest.TestCase):
    def setUp(self):
        """Setup Flask app and test client"""
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
        self.course_controller = CourseController()

    @patch.object(CourseDao, 'save_course')
    def test_create_course(self, mock_save_course):
        """Test the create course method"""
        mock_save_course.return_value = None  # Mock DAO behavior
        response = self.course_controller.create()
        self.assertEqual(response, "saved")
        mock_save_course.assert_called_once_with("test")

    @patch.object(CourseDao, 'create_course')
    def test_courses_post(self, mock_create_course):
        """Test courses method with POST request"""
        mock_create_course.return_value = None
        with self.app.test_request_context(
            '/create_course',
            method='POST',
            data={
                'course_id': 'C101',
                'course_name': 'Test Course',
                'description': 'Sample description',
                'credits': 4,
                'department': 'CS',
                'semester': 'Fall',
                'is_currently_active': True,
            }
        ):
            response = self.course_controller.courses()
            self.assertEqual(response, "Course created successfully!")
            mock_create_course.assert_called_once()

    @patch.object(CourseDao, 'get_course')
    def test_get_course(self, mock_get_course):
        """Test the get_course method"""
        mock_get_course.return_value = "Test Course"
        response = self.course_controller.get_course(1)
        self.assertEqual(response, "Test Course")
        mock_get_course.assert_called_once_with(1)

    @patch.object(CourseDao, 'get_course_materials_by_user')
    def test_get_material(self, mock_get_materials):
        """Test the get_material method"""
        mock_get_materials.return_value = [
            (1, 'PDF', 'Test Material', 'path/to/material.pdf')
        ]
        with self.app.test_request_context('/get_uploaded_materials/1'):
            response = self.course_controller.get_material(1)
            self.assertEqual(response.status_code, 200)
            mock_get_materials.assert_called_once_with(1)

if __name__ == "__main__":
    unittest.main()
