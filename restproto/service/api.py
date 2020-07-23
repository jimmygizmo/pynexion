from flask import Flask, request
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


todos = {}

@api.route('/<string:todo_id>')
class TodoSimple(Resource):
    def get(self, todo_id):
        return {todo_id: todos[todo_id]}

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}


if __name__ == '__main__':
    # On MacOS, to be able to connect, two things are required:
    # 1. The app.run call includes the argument: host="0.0.0.0"
    # 2. The container is run with the option mapping the port: -p 5000:5000 (docker run -p  5000:5000 <container_id>)
    # How this must runs when deployed on other platforms might vary slightly.
    app.run(debug=True, host="0.0.0.0")


##
#

