import React from 'react';
import { Switch, Route } from "react-router-dom";
import WebTorrent from 'webtorrent';

import Load from './Load';
import Session from './Session';

const ClientContext = React.createContext(new WebTorrent());

const App = () => {
  let WebTorrent = require('webtorrent');
  const [client, setClient] = React.useState(new WebTorrent());
  
  React.useEffect(() => {
    client.on('error', err => {
      console.log('[+] Webtorrent error: ' + err.message);
    });
  });

  return (
    <main className="container mt-5">
      <Switch>
        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/:magnetURI" children={<Session client={ client } />} />
        <Route exact path="/">
          <Load client={ client } />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
