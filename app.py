from flask import Flask
from datetime import datetime
import re

app = Flask(__name__)

@app.route('/')
def root():
    return 'main app. path root /. function root()'

@app.route('/hello/<name>')
def hello_there(name):
    now = datetime.now()
    formatted_now = now.strftime("%A, %d, %B, %Y, at %X")

    match_object = re.match("[a-zA-Z]+", name)

    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Guest"

    content = "Wassup, " + clean_name + "! It is " + formatted_now
    return content

