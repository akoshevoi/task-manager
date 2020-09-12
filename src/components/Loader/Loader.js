import React from 'react';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({isOpen}) => {
  return (
    <Modal open={isOpen}>
      <div className='loader'>
        <h3 className='loader__title'>Loading...</h3>
        <div className='loader__spinner'>
          <CircularProgress />
        </div>
      </div>
    </Modal> 
  );
}

export default Loader;
