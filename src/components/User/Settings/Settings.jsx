import { Close, Exit } from "../../../utils/const";
import { Link } from "react-router-dom";
import { useState } from "react";
import styleSettings from "./settings.module.scss";
import Select from 'react-select';

function Settings ({setIsLogged}){
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');


    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
      setDarkMode(prevMode => !prevMode);
    };

    const handleLogout = () => {
        // Дополнительная логика выхода, например, сброс статуса авторизации
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }

    return(
        <div className={styleSettings.profile}>
            <div className={styleSettings.ball__left}></div>
            <div className={styleSettings.frame}>
                <nav>
                    <div className={styleSettings.nav__items}>
                        <Link to="/profile">
                            <button>Профиль</button>
                        </Link>
                        {/* <Link to="/profile/tariffs">
                            <button >Тарифы <span>и оплаты</span></button>
                        </Link> */}
                        <Link to="/profile/settings">
                            <button className={styleSettings.nav__btn}>Настройка <span>аккаунта</span></button>
                        </Link>
                    </div>
                    <div className={styleSettings.nav__exit} onClick={handleLogout}>{Exit} &nbsp; выйти</div>
                </nav>

                <div className={styleSettings.settings}>
                    <h2>Настройка аккаунта</h2>
                    <div className={styleSettings.settings__password}>
                        <h4>Изменит пароль</h4>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Пароль"
                            className={password ? styleSettings.settings__input:""}
                        />
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordConfirmation(e.target.value);
                            }}
                            placeholder="Повторите пароль"
                            className={passwordConfirmation ? styleSettings.settings__input:""}
                        />
                        <button>Сохранить</button>
                    </div>
                    <div className={styleSettings.settings__theme}>
                        <div>
                            <h4>Тема</h4>
                            <button onClick={toggleTheme} className={styleSettings.theme__toggle}>
                                {darkMode ? (
                                    <div>
                                        <span role="img" aria-label="Light Mode" >
                                        ☀️
                                        </span>
                                        <span role="img" aria-label="Dark Mode" className={styleSettings.theme__choose}>
                                        🌙
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span role="img" aria-label="Light Mode" className={styleSettings.theme__choose}>
                                        ☀️
                                        </span>
                                        <span role="img" aria-label="Dark Mode" >
                                        🌙
                                        </span>
                                    </div>
                                )}
                            </button>
                        </div>
                        <div>
                            <h4>Помощь</h4>
                            <input type="text" placeholder="t.me/athkeeperinfo" readOnly/>
                        </div>
                    </div>
                </div>
                <Link to="/trade">
                        <div className={styleSettings.close}>{Close}</div>
                </Link>
            </div>
            <div className={styleSettings.ball__rigth}></div>
        </div>
    )
}

export default Settings