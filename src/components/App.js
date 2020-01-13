import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import AboutPage from '../components/about/AboutPage';
import HeaderPage from './common/HeaderPage';
import CoursesPage from './courses/CoursesPage';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <div className="container-fluid">
      <HeaderPage />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
