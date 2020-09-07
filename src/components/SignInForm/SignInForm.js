import React from 'react';
import Input from '../Input';
import InputPassword from '../InputPassword';
import FormButton from '../FormButton';

const SignInForm = ({
  values, 
  setValues,      
  showingPassword,
  setShowingPassword,
  isGlowError,
  setIsGlowError,
  helperTexts,
  setHelperTexts,
  getInfoAboutEmptyInputs,
  getInfoAboutValidInputs,
  handleSubmit,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  setErrorState,
  checkEmptyInputs,
  checkEmailValidity,
  checkPasswordValidity,
  checkEmailCorrect,
  checkPasswordCorrect,
}) => {
  return (
    <form className='authentication__form' onSubmit={handleSubmit}>
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
        isShowPassword={showingPassword.showPassword}
        helperText = {helperTexts.password}
        onMouseDown={handleMouseDownPassword}
        idInput='outlined-adornment-password'
        idHelperText='standard-password-helper-text'
        labelWidth={115}
      />
      <FormButton name='Sign In' helperText={helperTexts.formSubmit}/> 
    </form>
  );
};

export default SignInForm;