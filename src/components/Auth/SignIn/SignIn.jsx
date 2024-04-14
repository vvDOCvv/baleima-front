import axios from "axios";
import styleSignIn from "./signin.module.scss";
import React, { useState } from 'react';
import { MEXC_URL } from "../../../utils/const";
import { Link } from "react-router-dom";

const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
};

function SignIn ({ setIsLogged, setToken }){
    const [islogin, setLogin] = useState('');
    const [ispassword, setPassword] = useState('')

    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState('');
    const [allError, setAllError] = useState(false);

    const [imageIndex, setImageIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0); 

    const images = [
        "/img/robot/robot_1.png",
        "/img/robot/robot_2.png",
        "/img/robot/robot_3.png",
    ];

  const changeImages = () => {
    const interval = 500;

    for (let i = 0; i < images.length; i++) {
      setTimeout(() => {
        setImageIndex(i);
      }, i * interval);
    }
  };

  const handleBlur = () => {
    setImageIndex(prevIndex);
  };

  const handleLogin = (e) => {
      e.preventDefault();
  
      if (!islogin || !ispassword) {
        setLoginError(!islogin);
        setPasswordError(!ispassword);
        return;
      }
  
      axios.post(`${MEXC_URL}/api/auth/token`, {
        username: islogin,
        password: ispassword
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}
      )
        .then(function (response) {
          console.log(response)
          // Сохранение токена в LocalStorage
          saveTokenToLocalStorage(response.data.access_token);
          setIsLogged(true);
        })
        .catch(function (error) {
          console.log(error)
          // Обработка ошибок
          setError('Неверный логин или пароль');
          setAllError(true);
        });
  };
    
    return(
        <div className={styleSignIn.signin}>
            <div className={styleSignIn.ball__left}></div>
            <div className={styleSignIn.frame}>
                <div className={styleSignIn.signin__form}>
                    <div className={styleSignIn.first__item}>
                      <h2>С возвращением!</h2>
                      <div class={styleSignIn.signin__form__img}>
                          <img src={images[imageIndex]} alt={`Изображение ${imageIndex + 1}`} />
                      </div>
                    </div>
                    <p>Добро пожаловать обратно! Здесь твое место для вдохновения и достижения целей.</p>
                      <div className={styleSignIn.signin__btn}>
                        <Link to="/main/sign-up">
                            <button>Регистрация</button>
                        </Link>
                        <Link to="/main/sign-in">
                            <button className={styleSignIn.signin__btn__main}>Войти</button>
                        </Link>
                      </div>
                    <form onSubmit={handleLogin}>
                        <div className={styleSignIn.errorMessage}>
                            {loginError || passwordError ? "Пожалуйста, введите логин и пароль." : ""}
                        </div>
                        {error && <div className={styleSignIn.errorMessage}>{error}</div>}
                        <input 
                            type="text" 
                            placeholder="Почта"
                            value={islogin}
                            onChange={(e) => {
                                setLogin(e.target.value);
                                setLoginError(false);
                                setError('');
                                setAllError(false);
                            }}
                            className={loginError || allError ? styleSignIn.error : ''}
                        />
                        <input 
                            type="password" 
                            placeholder="Пароль"
                            value={ispassword}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                                setError('');
                                setAllError(false);
                            }}
                            onFocus={changeImages}
                            onBlur={handleBlur}
                            className={loginError || allError ? styleSignIn.error : ''}
                        />
                        <a href="#">Забыль пароль?</a>
                        <button type="submit">Войти</button>
                    </form>
                </div>
                <div class={styleSignIn.image__container}>
                    <img src={images[imageIndex]} alt={`Изображение ${imageIndex + 1}`} />
                </div>
            </div>
            <div className={styleSignIn.ball__rigth}></div>
        </div>
    )
}

export default SignIn