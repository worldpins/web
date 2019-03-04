import * as React from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

import Modal from '../../../common/modal';
import parseData from './_csvParser';

const UploadMap = () => {
  const [step] = React.useState(0);
  const [name, setName] = React.useState('');

  const onChange = React.useCallback(
    (e) => {
      setName(() => e.currentTarget.value);
    },
    [],
  );

  const onDrop = React.useCallback(
    ([file]) => {
      Papa.parse(file, {
        complete: async ({ data }) => {
          parseData(data, name);
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
    [name]);
  return (
    <Modal
      isOpen
    >
      {step === 0 &&
        <input type="text" placeholder="Give the map a name" value={name} onChange={onChange} />}
      {step === 1 && <Dropzone onDrop={onDrop}>
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
      </Dropzone>}
    </Modal>
  );
};

export default React.memo(UploadMap);
