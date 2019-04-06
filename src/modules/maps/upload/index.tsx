import * as React from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import { graphql } from 'react-apollo';

import Modal from '../../../common/modal';
import parseData from './_csvParser';
import uploadMapMutation from './_mutation.gql';

const UploadMap: React.FC<{ uploadMap: (input: any) => Promise<void>, history: any }> =
({ uploadMap, history }) => {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');

  const onChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
    },
    [setName],
  );

  const next = React.useCallback(() => { setStep(s => s + 1); }, []);
  const prev = React.useCallback(() => { setStep(s => s - 1); }, []);

  const onDrop = React.useCallback(
    ([file]) => {
      Papa.parse(file, {
        complete: async ({ data }) => {
          const map = parseData(data, name);
          await uploadMap({ variables: { map }, refetchQueries: ['maps'] });
          history.push('/maps');
        },
        skipEmptyLines: true,
      });
    },
    [name, uploadMap]);

  const buttons = React.useMemo(
    () => [
      { label: 'cancel', flavor: 'secondary' },
      step === 0 ?
        { label: 'Next', flavor: 'primary', onClick: next } :
        { label: 'Previous', flavor: 'primary', onClick: prev },
    ],
    [step]);

  return (
    <Modal
      buttons={buttons}
      isOpen
    >
      {step === 0 &&
        <input placeholder="Give the map a name" value={name} onChange={onChange} />}
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

// TODO: graphql static typing
export default graphql(
  uploadMapMutation, { name: 'uploadMap' },
)(React.memo(UploadMap));
