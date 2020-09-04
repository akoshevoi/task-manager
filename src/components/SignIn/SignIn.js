import React, {useState} from 'react';
import Input from '../Input';
import InputPassword from '../InputPassword';
import FormButton from '../FormButton';

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const [isGlowError, setIsGlowError] = useState({
    email: false,
    password: false
  });

  const [helperTexts, setHelperTexts] = useState({
    email: ' ',
    password: ' '
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = prop => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const setErrorState = (prop, condition, text) => {
    if (condition) {
      setIsGlowError({
        ...isGlowError,
        [prop]: true
      });
      setHelperTexts({
        ...helperTexts,
        [prop]: text
      }) 
    } else {
      setIsGlowError({
        ...isGlowError,
        [prop]: false
      });
      setHelperTexts({
        ...helperTexts,
        [prop]: ' '
      }) 
    }
  }

  const checkEmptyInputs = prop => event => {
   const condition = event.target.value.length === 0;
   setErrorState(prop, condition, 'Input must be filled');
  }

  const checkEmailValidity = prop => event => {
    const regExpEmail = /^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/;
    const value = event.target.value;
    const isValidValue = regExpEmail.test(value);
    setErrorState(prop, !isValidValue, 'Please enter correct email');
  }

  const checkPasswordValidity = prop => event => {
    const regExpPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/;
    const value = event.target.value;
    const isValidValue = regExpPassword.test(value);
    setErrorState(
      prop, 
      !isValidValue, 
      'Password must contain 7 characters, at least one number and one letter in uppercase'
    );
  }

  const checkEmailCorrect = prop => event => {
    const value = event.target.value;

    if (value.length > 0) {
      const closureEmailValidity = checkEmailValidity(prop);
      closureEmailValidity(event);
    } else {
      const closureEmptyInputs = checkEmptyInputs(prop);
      closureEmptyInputs(event);
    }
  }

  const checkPasswordCorrect = prop => event => {
    const value = event.target.value;

    if (value.length > 0) {
      const closurePasswordValidity = checkPasswordValidity(prop);
      closurePasswordValidity(event);
    } else {
      const closureEmptyInputs = checkEmptyInputs(prop);
      closureEmptyInputs(event);
    }
  }

  return (
    <div className='authentication'>
    <div className='container'>
      <form className='authentication__form'>
        <Input 
          value={values.email}
          isGlowError={isGlowError.email} 
          label='Enter email' 
          helperText={helperTexts.email}
          onChange={handleChange('email')}
          onBlur={checkEmailCorrect('email')}
        />
        <InputPassword 
          label='Enter password'
          isGlowError={isGlowError.password}
          value={values.password}
          onChange={handleChange('password')}
          onBlur={checkPasswordCorrect('password')}
          onClick={handleClickShowPassword('showPassword')}
          isShowPassword={values.showPassword}
          helperText = {helperTexts.password}
          onMouseDown={handleMouseDownPassword}
          idInput='outlined-adornment-password'
          idHelperText='standard-password-helper-text'
          labelWidth={115}
        />
        <FormButton 
          name='Sign In'
        />
      </form>
    </div>
  </div>
  );
};

export default SignIn;