import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({
  value,
  isGlowError,
  label, 
  helperText,
  onChange,
  onBlur
}) => (
  <TextField 
    value={value}
    error={isGlowError} 
    label={label} 
    variant='outlined' 
    helperText={helperText}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export default Input;