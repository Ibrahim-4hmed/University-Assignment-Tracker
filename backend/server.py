from flask import Flask
from flask_restful import Api
from models import db
import config
import os
from flask_cors import CORS
from routes.course_route import Courses
from routes.assignments_route import Assignments, Assignment

app = Flask(__name__)
CORS(app)
app.config.from_object(config)
api = Api(app)
db.init_app(app)

# # Create DB tables
# with app.app_context():
#     db.drop_all()
#     db.create_all()

# Register API endpoints
api.add_resource(Courses, '/courses')
api.add_resource(Assignments, '/assignments')
api.add_resource(Assignment, '/assignments/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)

