import React from "react";
import * as ReactDOM from 'react-dom';
import {
  HashRouter as Router, Switch, Route, Link
} from "react-router-dom";
import Calendar from '@/Calendar';
import Diary from '@/Diary';

export default function App() {
 
  return (

    <Router>
        <Switch>
          <Route path="/Diary">
            <Diary />
          </Route>
          <Route path="/">
            <Calendar />
          </Route>
        </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
