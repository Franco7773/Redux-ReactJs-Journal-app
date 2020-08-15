import React from 'react'
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailAndPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  
  const dispatch = useDispatch();
  const ui = useSelector( state => state.ui );

  const [{ name, email, password, confirm }, handleInputChange ] = useForm({
    name: 'gian', email: 'gian773@gmail.com', password: '1234567', confirm: '1234567'
  });

  const handleRegister = ( e ) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch( startRegisterWithEmailAndPasswordName( email, password, name ));
    }
  };
  const isFormValid = () => {
  
    if (name.trim().length === 0) {
      dispatch( setError('Name is required'));
      return false;

    } else if (!validator.isEmail( email )) {
      dispatch( setError('Email is not valid'));
      return false;

    } else if ( password !== confirm || password.length < 7) {
      dispatch( setError('Password should be at least 7 characters and match'));
      return false;
    }

    dispatch( removeError());
    return  true;
  };
  
  return (
    <>
      <h3 className="auth-main__login-tittle">Register</h3>

      <form onSubmit={ handleRegister } className="animate__animated animate__fadeIn animate__faster">

        {
          ui.msgError && <div className="auth-main__alert-error">{ ui.msgError }</div>
        }
        
        <input value={ name } onChange={ handleInputChange } type="text" name="name" className="auth-main__input" autoComplete="off" placeholder="Name" />
        <input value={ email } onChange={ handleInputChange } type="text" name="email" className="auth-main__input" autoComplete="off" placeholder="Email" />
        <input value={ password } onChange={ handleInputChange } type="password" name="password" className="auth-main__input" placeholder="Password" />
        <input value={ confirm } onChange={ handleInputChange } type="password" name="confirm" className="auth-main__input" placeholder="Confirm Password" />

        <button type="submit" className="btn btn--primary btn--block mb-5">Register</button>

        <Link to="/auth/login" className="link">Already registered?</Link>
      </form>
    </>
  );
}
