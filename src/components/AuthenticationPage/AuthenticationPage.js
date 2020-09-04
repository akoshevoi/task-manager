import React, {useState, useCallback, useEffect} from 'react';
import TabsAuthentication from '../TabsAuthentication';

const AuthenticationPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isDisabledSubmitBtn: false
  });

  const [isGlowError, setIsGlowError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [helperTexts, setHelperTexts] = useState({
    name: ' ',
    email: ' ',
    password: ' ',
    confirmPassword: ' ',
  });


/*
  const setDisabledStateSubmitBtn = () => {
    console.log(isGlowError);
  }
*/
  const setDisabledStateSubmitBtn = useCallback(
    () => {

      for (let key in isGlowError) {
        if (isGlowError[key]) {
          console.log('disabled');
         
        } 
      }
      
     console.log(isGlowError);
    },
    [isGlowError]
  )
  
  useEffect(() => {
    setDisabledStateSubmitBtn();
  }, [setDisabledStateSubmitBtn])

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
      /*
      setValues({
        ...values,
        isDisabledSubmitBtn: true
      });
      */
 
      setIsGlowError({
        ...isGlowError,
        [prop]: true
      });
      setHelperTexts({
        ...helperTexts,
        [prop]: text
      }); 
    } else {
      /*
      setValues({
        ...values,
        isDisabledSubmitBtn: false
      });
      */
       
      setIsGlowError({
        ...isGlowError,
        [prop]: false
      });
      setHelperTexts({
        ...helperTexts,
        [prop]: ' '
      }); 
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

  const checkEqualityOfPasswords = prop => {
    const valueFirstPassword = values.password;
    const valueConfirmPassword = values.confirmPassword;
    const condition = valueFirstPassword !== valueConfirmPassword;
    setErrorState(prop, condition, 'Passwords non equal');
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

  const checkConfirmPasswordCorrect = prop => event => {
    const value = event.target.value;

    if (value.length > 0) {
      checkEqualityOfPasswords(prop);
    } else {
      const closureEmptyInputs = checkEmptyInputs(prop);
      closureEmptyInputs(event);
    }
  }
  return (
    <div className='authentication-page'>
      <TabsAuthentication
        
      />
    </div>
  );
};

export default AuthenticationPage;