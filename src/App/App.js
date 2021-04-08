import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Load from './Load';
import Session from './Session';

var WebTorrent = require('webtorrent');

const App = () => {
  return (
    <main className="container">
      <Switch>
        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/:sessionID" children={<Session />} />
        <Route exact path="/">
          <Load />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
