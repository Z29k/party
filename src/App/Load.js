import React from 'react';
// import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

var WebTorrent = require('webtorrent');

const Load = (props) => {
  const [magnetURI, setMagnetURI] = React.useState("");

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    onDrop: (files) => {
      console.log(files);
      let client = new WebTorrent()
      client.seed(files, (torrent) => {
        setMagnetURI(torrent.magnetURI);
        console.log('Client is seeding ' + torrent.magnetURI);
      });
    }
  });

  // React.useEffect(() => {
  //   console.log("mounting: Load");
  //   return () => {
  //     console.log("unmounting: Load");
  //   };
  // }, []);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <h1 class="mt-5">Sticky footer</h1>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="card">
        <div className="card-body">
          { magnetURI }
        </div>
      </div>
    </section>
  );  
}

export default Load;