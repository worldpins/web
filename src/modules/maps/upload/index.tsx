import * as React from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

import Modal from '../../../common/modal';
import parseData from './_csvParser';

const UploadMap = () => {
  const onDrop = React.useCallback(
    ([file]) => {
      Papa.parse(file, {
        complete: async ({ data }) => {
          parseData(data);
          // await mutate({
          //   variables: {
          //     map: {
          //       name: 'Temp',
          //       pins,
          //     },
          //   },
          // });
        },
        skipEmptyLines: true,
      });
    },
    []);
  return (
    <Modal
      isOpen
    >
      <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'dropzone--isActive' : ''}`}
          >
            <input {...getInputProps()} />
            {isDragActive ?
              <p>Drop files here...</p> :
              <p>Try dropping some files here, or click to select files to upload.</p>
            }
          </div>
        );
      }}
      </Dropzone>
    </Modal>
  );
};

export default React.memo(UploadMap);
