from flask import Flask, render_template
from routes.test_route import test_bp
from routes.course_route import course_bp

app = Flask(__name__)

app.register_blueprint(test_bp, url_prefix="/user")
app.register_blueprint(course_bp, url_prefix="/course")


@app.route("/")
def hello_world():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
