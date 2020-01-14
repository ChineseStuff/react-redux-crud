import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import propTypes from 'prop-types';
import CoursesList from './CoursesList';

class CoursesPage extends React.Component {
  componentDidMount() {
    const { loadCourses, loadAuthors, authors, courses } = this.props;

    if (courses.length === 0)
      loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });

    if (authors.length === 0)
      loadAuthors().catch(error => {
        alert('Loading courses failed' + error);
      });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CoursesList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  createCourse: propTypes.func.isRequired,
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
