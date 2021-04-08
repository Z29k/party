import React from 'react';
import { useParams } from "react-router-dom";

var WebTorrent = require('webtorrent');

const Player = (props) => {
  let client = new WebTorrent();
  client.add(props.magnetURI, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
    var file = torrent.files.find(function (file) {
      return file.name.endsWith('.mp4')
    });
  
    // Display the file by adding it to the DOM.
    // Supports video, audio, image files, and more!
    file.appendTo('span');
  })

  return (
    <span>
    </span>
  );
}

const MagnetURIInput = () => {
  return (
    <form>
      <div className="form-group">
        {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="magnet?"></textarea>
      </div>
    </form>
  );
}

const Session = (props) => {
  const [magnetURI, setMagnetURI] = React.useState("");

  return (
    <section className="container">
      <h1 className="mt-5 mb-4">Sticky footer</h1>
      <Player magnetURI={ magnetURI } />
      <MagnetURIInput />
    </section>
  ); 
}

export default Session;
