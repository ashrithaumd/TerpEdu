import React from 'react';

function Dash() {
  return (
    <div>
    <style>
        {`
                /* General Styles */
        body {
        margin: 0;
        font-family: Arial, sans-serif;
        }

        .app {
        display: flex;
        flex-direction: column;
        }

        /* Header */
        .header {
        background-color: #D32F2F;
        color: white;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        }

        .profile-icon {
        font-size: 24px;
        }

        /* Navbar */
        .navbar {
        display: flex;
        justify-content: space-around;
        background-color: #757575;
        color: white;
        padding: 10px;
        width:20px;
        }

        .navbar span {
        cursor: pointer;
        }

        /* Content Layout */
        .content {
        display: flex;
        padding: 20px;
        }

        /* Main Content */
        .main-content {
        flex: 3;
        }

        .main-content h2 {
        margin-top: 0;
        }

        /* Course Cards */
        .course-cards {
        display: flex;
        gap: 20px;
        }

        .course-card {
        width: 150px;
        height: 200px;
        border-radius: 5px;
        color: white;
        display: flex;
        align-items: flex-end;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .course-content h4 {
        margin: 0;
        }

        .course-content p {
        font-size: 12px;
        color: #f0f0f0;
        }

        /* Sidebar */
        .sidebar {
        flex: 1;
        padding: 20px;
        position: relative;
        border-left: 2px solid #D32F2F;
        overflow: hidden;
        }

        .sidebar-content {
        position: relative;
        z-index: 2;
        }

        .todo-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        z-index: 2;
        }

        .todo-content {
        margin-left: 10px;
        }

        .todo-content p {
        margin: 0;
        font-size: 14px;
        }

        .todo-content small {
        color: gray;
        }

        /* Announcement */
        .announcement {
        margin-top: 20px;
        color: black;
        }

        /* Background Image */
        .side-image-container {
        position: absolute;
        top: 0;
        left: 200px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        }

        .side-image {
        width: 100%;
        height: auto;
        left:-185px;
        opacity: 0.2;
        filter: blur(1px);
        }

        `}
    </style>
    <div className="app">
      <header className="header">
        <h1>TerpEdu</h1>
        <div className="profile-icon">👤</div>
      </header>
      <div className="navbar">
        <span>Add/Drop</span>
        <span>Inbox</span>
        <span>To-do</span>
        <span>Course Catalog</span>
        <span>Calendar</span>
      </div>
      <div className="content">
        <div className="main-content">
          <h2>Welcome, Medini!</h2>
          <div className="course-cards">
            {renderCourseCard("Software Engineering", "ENPM611", "#D46A6A")}
            {renderCourseCard("Software Design and Implementation", "ENPM612", "#B94CA7")}
            {renderCourseCard("Software Testing and Maintenance", "ENPM614", "#4CA7D4")}
            {renderCourseCard("Reverse Software Engineering", "ENPM696", "#6A4CD4")}
          </div>
        </div>
        <div className="sidebar">
          <div className="side-image-container">
            <img
              src="https://media.istockphoto.com/id/1700535742/vector/turtle-icon.jpg?s=2048x2048&w=is&k=20&c=ZdczUpIyBaX2ymL9bs_i_SKQZUaEcogf4XdNPhB0Dbw="
              alt="Side Turtle"
              className="side-image"
            />
          </div>
          <div className="sidebar-content">
            <h3>To-do</h3>
            {renderToDoItem("Action item 1", "Class A", "Due tomorrow")}
            {renderToDoItem("Action item 2", "Class A", "Due tomorrow")}
            {renderToDoItem("Action item 3", "Class A", "Due tomorrow")}
            <h3>Announcements</h3>
            <div className="announcement">XXX YYY - Class A, Professor<br />Dear all, ...</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function renderCourseCard(title, code, color) {
  return (
    <div className="course-card" style={{ backgroundColor: color }}>
      <div className="course-content">
        <h4>{title}</h4>
        <p>{code}</p>
      </div>
    </div>
  );
}

function renderToDoItem(text, className, dueDate) {
  return (
    <div className="todo-item">
      <input type="checkbox" />
      <div className="todo-content">
        <p>{text}</p>
        <span>{className}</span>
        <small>{dueDate}</small>
      </div>
    </div>
  );
}

export default Dash;
