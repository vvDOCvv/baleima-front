import { Close, Exit, MEXC_URL } from "../../../utils/const";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import styleProfile from "./profile.module.scss";
import axios from "axios";

function Profile ({setIsLogged}){
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [loginEmail, setLoginEmail] = useState('');

    const [user, setUser] = useState({});
    const [changeUser, changeUserDispatch] = useReducer(reducerUser, {
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    });
    const [changeSettings, changeSettingsDispatch] = useReducer(reducerSettings, {
        mexc_api_key: "",
        mexc_secret_key: ""
      });
    
    const [userChangeBtn, setUserChangeBtn] = useState(true);
    const [userSettingdsBtn, setUserSettingsBtn] = useState(true);

    const [inputErrors, setInputErrors] = useState({});
    const [keyErrors, setKeyErrors] = useState({});

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem("accessToken");
      };

    const handleLogout = () => {
        // Дополнительная логика выхода, например, сброс статуса авторизации
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }
    
    useEffect(() => {
        axios.get(`${MEXC_URL}/api/user`, {
            headers: {
                'Accept': 'application/json',
                Authorization: `bearer ${getTokenFromLocalStorage()}`,
            },
            })
            .then(function (response) {      
            const userData = {
                first_name: response.data.first_name,
                email: response.data.email,
                last_name: response.data.last_name,
                phone_number: response.data.phone_number,
            };
            const userDataSettings = {
                mexc_api_key: response.data.mexc_api_key,
                mexc_secret_key: response.data.mexc_secret_key,
            }
            setUser(userData);
            setLoginEmail(response.data.username);
            changeUserDispatch({ type: "initial_data", payload: userData });
            changeSettingsDispatch({ type: "initial_data", payload: userDataSettings });
            })
            .catch(function (error) {})
            .finally(function () {});
    }, []);

    function reducerUser(changeUser, action) {
        switch (action.type) {
          case "initial_data":
            return { ...changeUser, ...action.payload };
          case "first_name":
            return { ...changeUser, first_name: action.value };
          case "email":
            return { ...changeUser, email:  action.value};
          case "last_name":
            return {...changeUser, last_name: action.value};
          case "phone_number":
            return {...changeUser, phone_number: action.value};
          default:
            return changeUser;
        }
      }

    function reducerSettings(changeSettings, action){
        switch (action.type) {
          case "initial_data":
            return {...changeSettings, ...action.payload}
          case "mexc_api_key":
            return {...changeSettings, mexc_api_key: action.value}
          case "mexc_secret_key":
            return {...changeSettings, mexc_secret_key: action.value}
          default:
              return changeSettings;
        }
    }

    const handleUserSaveBtn = () => {
        const validateData = () => {
          const errors = {};
      
          const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          };
      
          // Проверка поля email
          if (!validateEmail(changeUser.email)) {
            errors.email = true;
          }

          if(changeUser.first_name.length == 0){
            errors.first_name = true
          }
    
          if(changeUser.last_name.length == 0){
            errors.last_name = true
          }

          if(changeUser.phone_number.length == 0){
            errors.phone_number = true
          }
      
          // Устанавливаем ошибки в состояние компонента
          setInputErrors(errors);
      
          // Если есть ошибки, возвращаем false
          return Object.keys(errors).length === 0;
        };
    
        if (!validateData()) {
          return;
        }
    
        // Очищаем ошибки, если они были успешно отправлены
        setInputErrors({});
    
        axios.put(`${MEXC_URL}/api/user`, changeUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getTokenFromLocalStorage()}`,
          },
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        });
    
        setUserChangeBtn(!userChangeBtn);
      };

    const handleSettingBtn = (event) =>{
        event.preventDefault();
    
        const validateKey = () => {
          const errors = {};
    
          if(changeSettings.mexc_api_key.length == 0){
            errors.api_key = true
          }
    
          if(changeSettings.mexc_secret_key.length == 0){
            errors.secret_key = true
          }   
    
          setKeyErrors(errors)
    
          return Object.keys(errors).length === 0;
      }
      
        if (!validateKey()) {
          return;
        }
    
        // Очищаем ошибки, если они были успешно отправлены
        setKeyErrors({});
    
        axios.put(`${MEXC_URL}/api/user`, changeSettings,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${getTokenFromLocalStorage()}`,
              },
            }
          )
          .then((response) => {
            changeSettingsDispatch({ type: 'mexc_api_key', value:""}) 
            changeSettingsDispatch({ type: 'mexc_secret_key', value:""}) 
          })
          .catch((error) => {});
    
          setUserSettingsBtn(!userSettingdsBtn);
      }
      

    return(
        <div className={styleProfile.profile}>
            <div className={styleProfile.ball__left}></div>
            <div className={styleProfile.frame}>
                <nav>
                    <div className={styleProfile.nav__items}>
                        <Link to="/profile">
                            <button className={styleProfile.nav__btn}>Профиль</button>
                        </Link>
                        <Link to="/profile/tariffs">
                            <button>Тарифы <span>и оплаты</span></button>
                        </Link>
                        <Link to="/profile/settings">
                            <button>Настройка <span>аккаунта</span></button>
                        </Link>
                    </div>
                    <div className={styleProfile.nav__exit} onClick={handleLogout}>{Exit} &nbsp; выйти</div>
                </nav>
                <div className={styleProfile.profile__info}>
                    <h2>Профиль</h2>
                    <div className={styleProfile.profile__info__1}>
                        <div>
                            <h4>{user.first_name} {user.last_name}</h4>
                            <span>Date</span>
                        </div>
                    </div>
                    <div className={styleProfile.profile__info__2}>
                        <div className={styleProfile.profile__info__user}>
                                <h3>Личная информация</h3>
                                <input
                                    type="text"
                                    value={changeUser.first_name} 
                                    className={inputErrors.first_name ? `${styleProfile.errorInput}` : null}
                                    onChange={(e) => changeUserDispatch({ type: 'first_name', value: e.target.value }) }
                                    placeholder="Имя"
                                />
                                <input
                                    type="text"
                                    className={inputErrors.last_name ? `${styleProfile.errorInput}` : null}
                                    value={changeUser.last_name} 
                                    onChange={(e) => changeUserDispatch({ type: 'last_name', value: e.target.value }) }
                                    placeholder="Фамилия"
                                />
                                <input
                                    type="number"
                                    className={inputErrors.phone_number ? `${styleProfile.errorInput}` : null}
                                    value={changeUser.phone_number} 
                                    onChange={(e) => changeUserDispatch({ type: 'phone_number', value: e.target.value })} 
                                    placeholder="Номер телефона"
                                />
                                <input
                                    type="email"
                                    className={inputErrors.email ? `${styleProfile.errorInput}` : null}
                                    value={changeUser.email} 
                                    onChange={(e) => changeUserDispatch({ type: 'email', value: e.target.value })} 
                                    placeholder="Почта"
                                />
                                <button onClick={handleUserSaveBtn}>Сохранить</button>
                        </div>
                        <div className={styleProfile.profile__info__api}>
                                <h3>Api-ключи</h3>
                                <input
                                    type="text"
                                    placeholder="Api-key"
                                    value={changeSettings.mexc_api_key}
                                    className={keyErrors.api_key ? `${styleProfile.errorInput}` : null}
                                    onChange={(e) => changeSettingsDispatch({ type: 'mexc_api_key', value: (e.target.value) })} 
                                />
                                <input
                                    type="text"
                                    // value={secretKey}
                                    // onChange={(e) => {
                                    //     setSecretKey(e.target.value);
                                    // }}
                                    placeholder="Secret-key"
                                    // className={secretKey ? styleProfile.signin__input : ""}
                                    value={changeSettings.mexc_secret_key}
                                    className={keyErrors.secret_key ? `${styleProfile.errorInput}` : null}
                                    onChange={(e) => changeSettingsDispatch({ type: 'mexc_secret_key', value: (e.target.value) })} 
                                />
                                <button onClick={handleSettingBtn}>Сохранить</button>
                        </div>
                    </div>
                </div>
                <Link to="/trade">
                        <div className={styleProfile.close}>{Close}</div>
                </Link>
            </div>
            <div className={styleProfile.ball__rigth}></div>
        </div>
    )
}

export default Profile