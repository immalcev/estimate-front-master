import style from '../css/style.module.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit'
import { Base_URL } from '../baseUrl';

const LoginPage: React.FC = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const signIn = useSignIn();
  const authHeader = useAuthHeader()
  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError('');

    try {

      const response = await axios.post(
        `${Base_URL}login`,
        values
      );

      const token = response.data.tokenLong;
      localStorage.setItem('token', token);

      signIn({
        token: response.data.tokenLong,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { login: values.login }
      });

      navigate("/");
      console.log(token);
    } catch (error) {

      setError('Неправильное имя пользователя или пароль');

      console.error("Error: ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className={style.login_block}>
      <div className={style.logo}>
        <div className={style.logo_image}></div>
        <h2 className={style.logo_text}>
          Welcome to the <br />
          <span className={style.logo_text_sebbia}>SÉBBIA</span>
        </h2>
      </div>
      <form className={style.login_form} onSubmit={formik.handleSubmit}>
        <div className={style.login_inputs}>
          <input
            className={style.login_input}
            type="text"
            id="login"
            value={formik.values.login}
            onChange={formik.handleChange}
          />
          <input
            className={style.login_input}
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button className={style.login_button} disabled={formik.isSubmitting} type="submit">
          Войти
        </button>
        {error && <div className={style.error}>{error}</div>}
        <div>
          {authHeader()}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;