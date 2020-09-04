import React from 'react';
import Button from '@material-ui/core/Button';

const FormButton = ({name, disabled}) => {
  return (
    <Button variant='contained' color='primary' className='authentication__btn' disabled={disabled}>
      {name}
    </Button>
  );
};

export default FormButton;