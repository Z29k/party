import React from 'react';
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import WebTorrent, { Torrent } from 'webtorrent';

const Player = (props) => {
  let config = {
    file: props.file
  };

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
        width='100%'
        height='100%'
        />
    </div>
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
  let { client } = props;
  let { magnetURI } = useParams();
  const [stats, setStats] = React.useState({ peers: 0 });
  const [torrent, setTorrent] = React.useState();
  // const [file, setFile] = React.useState(new File([null], "empty file"));
  // const [sessionName, setSessionName] = React.useState("");

  React.useEffect(() => {
    if (torrent) {
      console.log('torrent files', torrent.files);
      var file = torrent.files.find((file) => {
        return file.name.endsWith('.mp4');
      });
      // console.log(file);
      if (!file) {
        console.error('file not mp4');
        return false;
      }
      file.appendTo('section');
  
      var updateStats = () => {
        setStats({ peers: torrent.numPeers });
      }
      setInterval(updateStats, 500);
    }
  }, [torrent]);

  React.useEffect(() => {
    // let magnetURI = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
    
    if (client.torrents.length > 0) {
      console.log('client already has torrent');
      setTorrent(client.torrents[0]);
    }
    else {
      console.log('adding torrent to client')
      client.add(magnetURI, (torrent) => {
        // Torrents can contain many files. Let's use the .mp4 file
        setTorrent(torrent);
        // Display the file by adding it to the DOM.
        // Supports video, audio, image files, and more!
        // file.appendTo('span');
      });
    }
  }, []);

  return (
    <section className="container">
      {/* <h1 className="mt-5 mb-4"></h1> */}
      {/* <Player file={ file } /> */}
      {/* <MagnetURIInput /> */}
      <h1>{ torrent && torrent.name }</h1>
      <p>{ "peers:" + stats.peers }</p>
    </section>
  ); 
}

export default Session;
