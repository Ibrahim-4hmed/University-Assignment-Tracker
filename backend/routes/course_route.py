from flask import Flask
from flask_restful import Resource, Api, abort, marshal_with, fields, reqparse
from models import CourseModel, db

app = Flask(__name__)
api = Api(app)

course_args = reqparse.RequestParser()
course_args.add_argument('name', type=str, required=True, help='please add a name for this course')
course_args.add_argument('semester', type=str, required=True, help='please add a semester for this course')

courseFields = {
    'id': fields.Integer,
    'name': fields.String,
    'semester': fields.String,
}

class Courses(Resource):
    @marshal_with(courseFields)
    def get(self):
        courses = CourseModel.query.all()
        return courses, 200
    
    @marshal_with(courseFields)
    def post(self):
        args = course_args.parse_args()
        course = CourseModel(name=args['name'], semester=args['semester'])
        db.session.add(course)
        db.session.commit()
        return course, 201
    