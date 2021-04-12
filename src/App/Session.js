import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player'

// const Player = (props) => {
//   let config = {
//     file: props.file
//   };

//   return (
//     <div className='player-wrapper'>
//       <ReactPlayer
//         className='react-player'
//         url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
//         width='100%'
//         height='100%'
//         />
//     </div>
//   );
// }

const Session = (props) => {
  let { id } = useParams(); 
  const [torrent, setTorrent] = React.useState();

  useEffect(() => {
    if (torrent && torrent.files.length) {
      console.log('torrent files', torrent.files);
      var file = torrent.files.find((file) => {
        return file.name.endsWith('.mp4');
      });
      if (!file) {
        console.error('file not mp4');
        return false;
      }
      file.appendTo('section');
    }
  }, [torrent]);

  // useEffect(() => {
  //   if (torrent) {
  //     torrent.addPeer()
  //   }
  // }, [torrent]);

  useEffect(() => {
    // let magnetURI = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
    if (props.client.torrents.length > 0) {
      console.log('starting session: initiator');
      setTorrent(props.client.torrents[0]);
    }
    else {
      console.log('starting session: non-initiator');
      props.client.add({ 
        infoHash: id,
        announce: [
          "udp://tracker.leechers-paradise.org:6969",
          "udp://tracker.coppersurfer.tk:6969",
          "udp://tracker.opentrackr.org:1337",
          "udp://explodie.org:6969",
          "udp://tracker.empire-js.us:1337",
          "wss://tracker.btorrent.xyz",
          "wss://tracker.openwebtorrent.com"
      ]
      }, (torrent) => { setTorrent(torrent) });
    }
    return () => {
      props.client.destroy((err) => {
        if (err) {
          console.error("[+] client error:", err.message);
        }
      });
    }
  }, []);

  return (
    <section className="container">
      {/* <h1 className="mt-5 mb-4"></h1> */}
      {/* <Player file={ file } /> */}
      {/* <MagnetURIInput /> */}
      <h1>{ torrent && torrent.name }</h1>
      <p>{ torrent && "peers: " + torrent.numPeers }</p>
    </section>
  ); 
}

export default Session;
