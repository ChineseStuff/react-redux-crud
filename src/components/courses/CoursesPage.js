import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import propTypes from 'prop-types';
import CoursesList from './CoursesList';

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.loadCourses().catch(error => {
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
  loadCourses: propTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
  loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
