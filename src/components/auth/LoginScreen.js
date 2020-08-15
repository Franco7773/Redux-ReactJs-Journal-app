import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginWithEmailAndPassword, startGoogleLogin } from '../../actions/auth';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const ui = useSelector( state => state.ui );

  const [{ email, password }, handleInputChange ] = useForm({
    email: 'gian7773@gmail.com', password: '1234567'
  });

  const handleLogin = ( e ) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch( startLoginWithEmailAndPassword( email, password ));
    }
  }

  const handleGoogleLogin = ( e ) => {
    e.preventDefault();

    dispatch( startGoogleLogin());
  }

  const isFormValid = () => {
    if (!validator.isEmail( email )) {
      dispatch( setError('Email is not valid'));
      return false;
    } else if ( password.length < 7) {
      dispatch( setError('Password should be at least 7 characters and match'));
      return false;
    }
    dispatch( removeError());
    return true;
  };
  
  return (
    <>
      <h3 className="auth-main__login-tittle">Login</h3>

      <form onSubmit={ handleLogin } className="animate__animated animate__fadeIn animate__faster">

        {
          ui.msgError && <div className="auth-main__alert-error">{ ui.msgError }</div>
        }

        <input value={ email } onChange={ handleInputChange } type="text" name="email" className="auth-main__input" autoComplete="off" placeholder="Email" />
        <input value={ password } onChange={ handleInputChange } type="password" name="password" className="auth-main__input" placeholder="Password" />

        <button disabled={ ui.loading } type="submit" className="btn btn--primary btn--block">Login</button>

        <hr />

        <div className="auth-main__social-network">
          <p>Login with social network</p>

          <div onClick={ handleGoogleLogin } className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>

        </div>

        <Link to="/auth/register" className="link">Create new Account</Link>
      </form>
    </>
  );
}
