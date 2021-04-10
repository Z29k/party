import React from 'react';
import { Switch, Route } from "react-router-dom";

import Load from './Load';
import Session from './Session';

let WebTorrent = require('webtorrent');

const ClientContext = React.createContext();

const App = () => {
  const [client] = React.useState(new WebTorrent());
  
  React.useEffect(() => {
    client.on('error', err => {
      console.log('[+] client error:', err.message);
    });
  });

  return (
    <main className="container mt-5">
      <Switch>
        <Route path="/:magnetURI" children={<Session client={ client } />} />
        <Route path="/">
          <Load client={ client } />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
