from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello():
    html = "<h3>Flask via Docker. Container: python:3.7-alpine</h3>"
    return html


if __name__ == "__main__":
    #app.run(debug=True, host="0.0.0.0")
    app.run(debug = True, host = "0.0.0.0", port = 80)

