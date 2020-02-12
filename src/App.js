import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';
import Delete from './pages/Delete';
import UpdateItem from './pages/UpdateItem';

import counterpart from 'counterpart';

function App() {
  return (
    <div>
      <Navigation  counterpart={counterpart} />
      <Router>
        <Route exact path="/" render={() => (<Redirect to="/Create" />)} />
  <Route path="/Create" component={() => <Create counterpart={counterpart} />} />
        <Route path="/Read" component={Read}/>
        <Route exact path="/Update" component={Update}/>
        <Route  path="/Update/:id" component={UpdateItem}/>
        <Route path="/Delete" component={Delete}/>
      </Router>
    </div>
  );
}

export default App;
