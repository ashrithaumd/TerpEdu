import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, json
from controller.inst_controller import InstController
from routes.inst_route import inst_bp

class TestInstController(unittest.TestCase):
    def setUp(self):
        # Setup Flask app for testing
        self.app = Flask(__name__)
        self.app.register_blueprint(inst_bp)
        self.client = self.app.test_client()

    @patch("dao.inst_dao.InstDao.fetch_courses_for_instructor")
    def test_get_courses_by_instructor(self, mock_fetch_courses):
        # Mock DAO response
        mock_fetch_courses.return_value = [
            (101, "Course A", "Description A", "CS"),
            (102, "Course B", "Description B", "Math"),
        ]
        instructor_id = 1
        
        # Call API
        response = self.client.get(f"/get_courses_by_inst/{instructor_id}")
        data = json.loads(response.data)
        
        # Assertions
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["course_ID"], 101)
        self.assertEqual(data[0]["name"], "Course A")

    @patch("dao.inst_dao.InstDao.post_announcements")
    def test_post_announcement_success(self, mock_post_announcement):
        # Mock successful DAO response
        mock_post_announcement.return_value = {"message": "Announcement posted successfully"}
        payload = {
            "course_id": 101,
            "user_id": 1,
            "announcement": "Test Announcement"
        }
        
        # Call API
        response = self.client.post("/announce", json=payload)
        data = json.loads(response.data)
        
        # Assertions
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Announcement posted successfully")

    @patch("dao.inst_dao.InstDao.post_announcements")
    def test_post_announcement_failure(self, mock_post_announcement):
        # Mock DAO failure response
        mock_post_announcement.return_value = {"error": "Failed to post announcement"}
        payload = {
            "course_id": 101,
            "user_id": 1,
            "announcement": ""
        }
        
        # Call API
        response = self.client.post("/announce", json=payload)
        data = json.loads(response.data)
        
        # Assertions
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", data)

    def test_post_announcement_invalid_method(self):
        # Call API with an unsupported method (GET instead of POST)
        response = self.client.get("/announce")
        self.assertEqual(response.status_code, 405)

if __name__ == "__main__":
    unittest.main()
