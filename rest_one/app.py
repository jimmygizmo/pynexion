from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if (request.method == 'POST'):
        posted_json = request.get_json()
        return jsonify({'posted json was': posted_json}), 201
    else:
        return jsonify({'default get response': 'hello there'})

@app.route('/times_five/<int:int_argument>', methods=['GET'])
def get_times_five(int_argument):
    response_dict = {'result': int_argument * 5}
    return jsonify(response_dict)


if __name__ == '__name__':
    app.run(debug=True)

    