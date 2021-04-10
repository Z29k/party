import React from 'react';
// import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router';

const Load = (props) => {
  let { client } = props;
  const history = useHistory();

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    onDrop: (files) => {
      console.log('file selected', files);
      client.seed(files[0], (torrent) => {
        console.log("torrent:", torrent);
        // history.push('/' + torrent.magnetURI);
      });
    }
  });

  // React.useEffect(async () => {
  //   client.on('torrent', (torrent) => {
  //     console.log('torrent loaded', torrent); 
  //   });
  // }, []);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="card">
          <div className="card-body">
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>

      </div>
    </section>
  );  
}

export default Load;