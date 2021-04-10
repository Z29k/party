import React, { useRef } from 'react';
import { useHistory } from 'react-router';
// import styled from 'styled-components';

var DragDrop = require('drag-drop');

const Load = (props) => {
  const fileInputRef = useRef(null);
  const history = useHistory();

  const onFileInputChange = (event) => {
    onOpen(event.target.files);
  };

  const onFileInputClick = () => {
    fileInputRef.current.click();
  }

  const onOpen = (files) => {
    console.log('files:', files);
    const opts = {
      private: true
    };
    props.client.seed(files, opts, onSeed);
  };

  const onSeed = (torrent) => {
    console.log("seeding torrent:", torrent);
    torrent.on('error', err => {
      console.error('[+] torrent error:', err.message);
    });
    torrent.on('wire', function (wire, addr) {
      console.log('connected to peer with address ' + addr);
    });
    history.push('/' + encodeURIComponent(torrent.magnetURI));
  };

  React.useEffect(() => {
    DragDrop('#dragdrop', onOpen);
  }, []);
  
  return (
    <section className="container">
      <div id="dragdrop" className="card" onClick={ onFileInputClick }>
        <input type='file' id='file' ref={ fileInputRef } style={{display: 'none'}} onChange={ onFileInputChange }/>
        <div className="card-body">
          <p className="user-select-none">Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </section>
  );  
}

export default Load;