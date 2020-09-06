import React from 'react';
import Input from '../Input';
import InputPassword from '../InputPassword';
import FormButton from '../FormButton';

const SignUpForm = ({
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
  checkEqualityOfPasswords,
  checkEmailCorrect,
  checkPasswordCorrect,
  checkConfirmPasswordCorrect
  }) => {
  return (
      <form className='authentication__form' onSubmit={handleSubmit}>
        <Input 
          value={values.name}
          isGlowError={isGlowError.name} 
          label='Enter name' 
          helperText={helperTexts.name}
          onChange={handleChange('name')}
          onBlur={checkEmptyInputs('name')}
        />
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
        <InputPassword 
          label='Confirm password'
          isGlowError={isGlowError.confirmPassword}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={checkConfirmPasswordCorrect('confirmPassword')}
          onClick={handleClickShowPassword('showConfirmPassword')}
          isShowPassword={showingPassword.showConfirmPassword}
          helperText = {helperTexts.confirmPassword}
          onMouseDown={handleMouseDownPassword}
          idInput='outlined-adornment-confirmPassword'
          idHelperText='standard-confirmPassword-helper-text'
          labelWidth={130}
        />
        <FormButton name='Sign Up' helperText={helperTexts.formSubmit}/>
      </form>
  );
};

export default SignUpForm;