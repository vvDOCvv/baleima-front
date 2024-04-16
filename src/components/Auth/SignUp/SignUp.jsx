import axios from "axios";
import { AkarIcons, MEXC_URL } from "../../../utils/const";
import styleSignUp from "./signup.module.scss";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function SignUp (){
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isResponse, setIsResponse] = useState(false)

    const [apiKey, setApiKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [loginEmailError, setLoginEmailError] = useState(false);

    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [formError, setFormError] = useState(false);
    
    const [userRep, setUserRep] = useState(false);
    const [userCorrect, setUserCorrect] = useState(false);

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

    const validateEmail = (email) => {
        if (!email) {
            setLoginEmailError(false); 
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
    
        setLoginEmailError(!isValid);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !number || !loginEmail || !password || !passwordConfirmation || !isResponse) {
          setFormError(true);

          setFirstnameError(!firstname);
          setLastnameError(!lastname);
          setNumberError(!number);
          setLoginEmailError(!loginEmail);
          setPasswordError(!password);
          setPasswordConfirmationError(!passwordConfirmation);
          return;
        }
    
        if (password !== passwordConfirmation) {
          setFormError(true);
          setPasswordError(true);
          setPasswordConfirmationError(true);
          return;
        }
    
        axios.post(`${MEXC_URL}/api/auth/registration`, {
          email: loginEmail,
          phone_number: number,
          first_name: firstname,
          last_name: lastname,
          username: loginEmail,
          password: password,
          mexc_api_key: apiKey,
          mexc_secret_key: secretKey,
        },{
            headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
        .then(function (response) {
          setUserCorrect(true)
          setUserRep(false)

          setFirstname("")
          setLastname("")
          setNumber("")
          setLoginEmail("")
          setPassword("")
          setPasswordConfirmation("")
        })
        .catch(function (error) {
          if(error.detail){
            setLoginEmailError(true);
            setUserRep(true)
          }
          
        });
    
        setFormError(false);
    };

    return(
        <div className={styleSignUp.signup}>
            <div className={styleSignUp.ball__left}></div>
            <div className={styleSignUp.frame}>
                    <form onSubmit={handleRegister}>
                        <div>
                            {formError && <div className={styleSignUp.errorMessage}>Заполните все поля формы и убедитесь, что пароли совпадают.</div>}
                            {userRep && <div className={styleSignUp.errorMessage}>Пользователь с таким логином уже существует.</div>}
                            {userCorrect && <div className={styleSignUp.correctMessage}>Вы успешно зарегистрировались!</div>}
                        </div>
                        <div className={styleSignUp.form__post}>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => {
                                    setFirstname(e.target.value);
                                    setFirstnameError(false);
                                    setFormError(false);
                                }}
                                placeholder="Имя"
                                className={firstnameError ? styleSignUp.error : ''}
                            />
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => {
                                    setLastname(e.target.value);
                                    setLastnameError(false);
                                    setFormError(false);
                                }}
                                placeholder="Фамилия"
                                className={lastnameError ? styleSignUp.error : ''}
                            />
                            <input
                                type="number"
                                value={number}
                                onChange={(e) => {
                                    setNumber(e.target.value);
                                    setNumberError(false);
                                    setFormError(false);
                                }}
                                placeholder="Номер телефона"
                                className={numberError ? styleSignUp.error : ''}
                            />
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                    validateEmail(e.target.value)
                                    // setLoginEmailError(false);
                                    // setFormError(false);
                                }}
                                placeholder="Почта"
                                className={loginEmailError ? styleSignUp.error__focus: ''}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                    setFormError(false);
                                }}
                                onFocus={changeImages} 
                                onBlur={handleBlur}
                                placeholder="Пароль"
                                className={passwordError ? styleSignUp.error : ''}
                            />
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => {
                                    setPasswordConfirmation(e.target.value);
                                    setPasswordConfirmationError(false);
                                    setFormError(false);
                                }}
                                onFocus={changeImages}
                                onBlur={handleBlur}
                                placeholder="Повторите пароль"
                                className={passwordConfirmationError ? styleSignUp.error : ''}
                            />

                            <p><span>*</span>Ключи можете добавить сейчас, либо в профиле</p>
                            <input
                                type="text"
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value);
                                }}
                                placeholder="Api-key"
                                className={apiKey ? styleSignUp.signin__input:""}
                            />
                            <input
                                type="text"
                                value={secretKey}
                                onChange={(e) => {
                                    setSecretKey(e.target.value);
                                }}
                                placeholder="Secret-key"
                                className={secretKey ? styleSignUp.signin__input:""}
                            />
                            <div className={styleSignUp.response}>
                                <input type="checkbox"  onClick={()=> setIsResponse(!isResponse)}/>
                                <p>Отказ от ответственности</p>
                                <a href="#">подробнее&nbsp;{AkarIcons}</a>
                                
                            </div>
                            <button type="submit">зарегистрироваться</button>
                            <div className={styleSignUp.forTablet}>У вас уже есть аккаунт? <Link to="/main/sign-in">Войти</Link></div>
                        </div>
                    </form>
                    <div className={styleSignUp.registr}>
                        <div> 
                            <h2>Регистрация аккаунта</h2>
                            <p>Присоединяйтесь, чтобы начать Ваш путь к финансовой независимости вместе с нами.</p>
                        </div>
                        <div class={styleSignUp.image__container}>
                            <img src={images[imageIndex]} alt={`Изображение ${imageIndex + 1}`} />
                        </div>
                        <div className={styleSignUp.forLaptop}>У вас уже есть аккаунт? <Link to="/main/sign-in">Войти</Link></div>
                    </div>
                    <div className={styleSignUp.signin__btn}>
                        <Link to="/main/sign-up">
                            <button className={styleSignUp.signin__btn__main}>Регистрация</button>
                        </Link>
                        <Link to="/main/sign-in">
                            <button >Войти</button>
                        </Link>
                    </div>
                    <div className={styleSignUp.registr__forPhone}>
                        <h2>Добро пожаловать!</h2>
                        <div class={styleSignUp.signin__form__img}>
                            <img src={images[imageIndex]} alt={`Изображение ${imageIndex + 1}`} />
                        </div>
                    </div>
            </div>
            <div className={styleSignUp.ball__left}></div>
        </div>
    )
}

export default SignUp