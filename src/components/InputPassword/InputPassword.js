import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const InputPassword = ({
  label,
  isGlowError,
  value,
  onChange,
  onBlur,
  onClick,
  isShowPassword,
  helperText,
  onMouseDown,
  idInput,
  idHelperText,
  labelWidth
}) => {
  return (
  <FormControl variant='outlined'>
    <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
    <OutlinedInput
      error={isGlowError}
      id={idInput}
      type={isShowPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      endAdornment={
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={onClick}
            onMouseDown={onMouseDown}
            edge='end'
          >
            {isShowPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      labelWidth={labelWidth}
    />
    <FormHelperText error={isGlowError} id={idHelperText}>
      {helperText}
    </FormHelperText>
  </FormControl>
  );
};

export default InputPassword;