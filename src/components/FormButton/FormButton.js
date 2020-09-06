import React from 'react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const FormButton = ({name, helperText}) => {
  return (
    <>
    <Button 
      variant='contained' 
      color='primary' 
      className='authentication__btn' 
      type='submit'
    >
      {name}
    </Button>
    <FormHelperText error className='authentication__helper-text' >
      {helperText}
    </FormHelperText>
    </>
  );
};

export default FormButton;