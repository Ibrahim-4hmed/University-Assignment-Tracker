from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Course model
class CourseModel(db.Model):
    __tablename__ = 'course_model'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    semester = db.Column(db.String(50), nullable=True)
    # assignments = db.relationship('AssignmentModel', backref='course_model', lazy=True)

# Assignment model
class AssignmentModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course_model.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default='Pending')  # Can be: Pending, Completed, Overdue