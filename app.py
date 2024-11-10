from flask import Flask, render_template
from routes.test_route import test_bp

app = Flask(__name__)
app.config.from_object("config")

app.register_blueprint(test_bp, url_prefix="/user")


@app.route("/")
def hello_world():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
