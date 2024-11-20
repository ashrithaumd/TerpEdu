import unittest
from unittest.mock import MagicMock, patch
from flask import Flask
from controller.admin_controller import AdminController

# Create a Flask app for testing purposes
app = Flask(__name__)

class TestAdminController(unittest.TestCase):
    def setUp(self):
        # Set up an instance of AdminController with a mocked AdminDao
        self.admin_controller = AdminController()
        self.admin_controller.admin_dao = MagicMock()

    def test_enrollment_success(self):
        # Mock the DAO method for successful enrollment
        self.admin_controller.admin_dao.enrollment.return_value = None

        # Call the enrollment method
        response = self.admin_controller.enrollment(user_id=1, course_id=101, status='Active')

        # Verify the response
        self.assertEqual(response, {"status": "success", "message": "User enrolled successfully."})
        # Ensure DAO method was called with correct parameters
        self.admin_controller.admin_dao.enrollment.assert_called_once_with(1, 101, 'Active')

    def test_enrollment_failure(self):
        # Mock the DAO method to raise an exception
        self.admin_controller.admin_dao.enrollment.side_effect = Exception("Enrollment error")

        # Call the enrollment method
        response = self.admin_controller.enrollment(user_id=1, course_id=101, status='Active')

        # Verify the response
        self.assertEqual(response, {"status": "error", "message": "Enrollment error"})

    def test_get_announcements_success(self):
        # Mock the DAO method to return a list of announcements
        mock_announcements = [
            {
                "CourseID": 101,
                "CourseName": "Math 101",
                "Announcement": "Exam on Friday",
                "DatePosted": "2024-11-20 10:00:00"
            }
        ]
        self.admin_controller.admin_dao.get_announcements.return_value = mock_announcements

        # Call the get_announcements method
        response = self.admin_controller.get_announcements()

        # Verify the response
        self.assertEqual(response, {"status": "success", "announcements": mock_announcements})
        # Ensure DAO method was called
        self.admin_controller.admin_dao.get_announcements.assert_called_once()

    def test_get_announcements_failure(self):
        # Mock the DAO method to raise an exception
        self.admin_controller.admin_dao.get_announcements.side_effect = Exception("Database error")

        # Call the get_announcements method
        response = self.admin_controller.get_announcements()

        # Verify the response
        self.assertEqual(response, {"status": "error", "message": "Database error"})
        
    # @patch('controller.admin_controller.request')
    # def test_assign_instructor_success(self, mock_request):
    #     # Mock the incoming request JSON payload
    #     mock_request.json = {"course_id": 101, "instructor_id": 202}

    #     # Mock the DAO method for assigning instructors
    #     self.admin_controller.admin_dao.assign_course.return_value = None

    #     # Create a test request context
    #     with app.test_request_context('/assign_instructor', method='POST', json=mock_request.json):
    #         response, status_code = self.admin_controller.assign_instructor()

    #         # Verify the response and status code
    #         self.assertEqual(status_code, 201)
    #         self.assertEqual(response.json, {"message": "Instructor assigned successfully"})
    #         # Ensure DAO method was called with correct parameters
    #         self.admin_controller.admin_dao.assign_course.assert_called_once_with(101, 202)


    # @patch('controller.admin_controller.request')
    # def test_assign_instructor_success(self, mock_request):
    #     # Mock the incoming request JSON payload
    #     mock_request.json = {"course_id": 101, "instructor_id": 202}

    #     # Mock the DAO method for assigning instructors
    #     self.admin_controller.admin_dao.assign_course.return_value = None

    #     # Use Flask's test_request_context for request context
    #     with app.test_request_context():
    #         response, status_code = self.admin_controller.assign_instructor()

    #         # Verify the response and status code
    #         self.assertEqual(status_code, 201)
    #         self.assertEqual(response.json, {"message": "Instructor assigned successfully"})
    #         # Ensure DAO method was called with correct parameters
    #         self.admin_controller.admin_dao.assign_course.assert_called_once_with(101, 202)

    # @patch('controller.admin_controller.request')
    # def test_assign_instructor_failure(self, mock_request):
    #     # Mock the incoming request JSON payload
    #     mock_request.json = {"course_id": 101, "instructor_id": 202}

    #     # Mock the DAO method to raise an exception
    #     self.admin_controller.admin_dao.assign_course.side_effect = Exception("Assignment error")

    #     # Use Flask's test_request_context for request context
    #     with app.test_request_context():
    #         response, status_code = self.admin_controller.assign_instructor()

    #         # Verify the response and status code
    #         self.assertEqual(status_code, 500)
    #         self.assertEqual(response.json, {"error": "Assignment error"})

    # @patch('controller.admin_controller.request')
    # def test_enroll_user_success(self, mock_request):
    #     # Mock the incoming request JSON payload
    #     mock_request.json = {"user_id": 1, "course_id": 101, "status": "Active"}

    #     # Mock the DAO method for enrollment
    #     self.admin_controller.admin_dao.enrollment.return_value = None

    #     # Use Flask's test_request_context for request context
    #     with app.test_request_context():
    #         response = self.admin_controller.enroll_user()

    #         # Verify the response
    #         self.assertEqual(response, {"status": "success", "message": "User enrolled successfully."})
    #         # Ensure DAO method was called with correct parameters
    #         self.admin_controller.admin_dao.enrollment.assert_called_once_with(1, 101, "Active")

    # @patch('controller.admin_controller.request')
    # def test_enroll_user_failure(self, mock_request):
    #     # Mock the incoming request JSON payload
    #     mock_request.json = {"user_id": 1, "course_id": 101, "status": "Active"}

    #     # Mock the DAO method to raise an exception
    #     self.admin_controller.admin_dao.enrollment.side_effect = Exception("Enrollment error")

    #     # Use Flask's test_request_context for request context
    #     with app.test_request_context():
    #         response, status_code = self.admin_controller.enroll_user()

    #         # Verify the response and status code
    #         self.assertEqual(status_code, 500)
    #         self.assertEqual(response.json, {"error": "Enrollment error"})

if __name__ == "__main__":
    unittest.main()