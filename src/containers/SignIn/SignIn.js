import React, {useState} from 'react';
import SignInForm from '../../components/SignInForm';
import {signInWithEmailAndPassword} from '../../api/auth';
import {useDispatch} from 'react-redux';
import {authenticationUser} from '../../redux/actions/user';
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignIn = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [showingPassword, setShowingPassword] = useState({
    showPassword: false
  });


  const [isGlowError, setIsGlowError] = useState({
    email: false,
    password: false
  });

  const [helperTexts, setHelperTexts] = useState({
    email: ' ',
    password: ' ',
    formSubmit: ' '
  });

  const getInfoAboutEmptyInputs = () => {
    const objectLength = Object.keys(values).length;
    let qtyFilledInputs = 0;
    
    for (let key in values) {
      if (values[key].length > 0) {
        qtyFilledInputs++;
      }
    } 

    return objectLength === qtyFilledInputs 
      ? true
      : false
  };

  const getInfoAboutValidInputs = () => {
    const objectLength = Object.keys(values).length;
    let qtyValidInputs = 0;

    for (let key in isGlowError) {
      if (isGlowError[key] === false) {
        qtyValidInputs++;
      }
    }

    return objectLength === qtyValidInputs
      ? true
      : false
  }

  const handleSubmit = event => {
    event.preventDefault();

    const conditionEmptyInputs = getInfoAboutEmptyInputs();
    const conditionValidInputs = getInfoAboutValidInputs();
    
    if (!conditionEmptyInputs) {
      setHelperTexts({
        ...helperTexts,
        formSubmit: 'Fill all inputs'
      }); 
    } else if (!conditionValidInputs) {
      setHelperTexts({
        ...helperTexts,
        formSubmit: 'Check validity inputs'
      }); 
    } else {
      setHelperTexts({
        ...helperTexts,
        formSubmit: ' '
      }); 

      signInWithEmailAndPassword(values.email, values.password)
        .then(authUser => {
          dispatch(authenticationUser(authUser));
          history.push(ROUTES.PROJECTS_BOARD);
        })
        .catch(error => {
          setHelperTexts({
            ...helperTexts,
            formSubmit: error.message
          });
        })
      
      setValues({
        email: '',
        password: ''
      });
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = prop => () => {
    setShowingPassword({ ...showingPassword, [prop]: !showingPassword[prop] });
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
    <div className='container'>
      <SignInForm 
        values={values}
        setValues={setValues}
        showingPassword={showingPassword} 
        setShowingPassword={setShowingPassword}
        isGlowError={isGlowError}
        setIsGlowError={setIsGlowError}
        helperTexts={helperTexts}
        setHelperTexts={setHelperTexts}
        getInfoAboutEmptyInputs={getInfoAboutEmptyInputs}
        getInfoAboutValidInputs={getInfoAboutValidInputs}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        setErrorState={setErrorState}
        checkEmptyInputs={checkEmptyInputs}
        checkEmailValidity={checkEmailValidity}
        checkPasswordValidity={checkPasswordValidity}
        checkEmailCorrect={checkEmailCorrect}
        checkPasswordCorrect={checkPasswordCorrect}
      />
    </div>
  );
};

export default SignIn;