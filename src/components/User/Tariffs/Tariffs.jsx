import { Close, Exit } from "../../../utils/const";
import { Link } from "react-router-dom";
import styleTariffs from "./tariffs.module.scss";

function Tariffs ({setIsLogged}){
    const handleLogout = () => {
        // Дополнительная логика выхода, например, сброс статуса авторизации
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }

    return(
        <div className={styleTariffs.profile}>
            <div className={styleTariffs.ball__left}></div>
            <div className={styleTariffs.frame}>
                <nav>
                    <div className={styleTariffs.nav__items}>
                        <Link to="/profile">
                            <button>Профиль</button>
                        </Link>
                        <Link to="/profile/tariffs">
                            <button className={styleTariffs.nav__btn}>Тарифы <span>и оплаты</span></button>
                        </Link>
                        <Link to="/profile/settings">
                            <button >Настройка <span>аккаунта</span></button>
                        </Link>
                    </div>
                    <div className={styleTariffs.nav__exit} onClick={handleLogout}>{Exit} &nbsp; выйти</div>
                </nav>

                <div className={styleTariffs.tariffs}>
                        <h2>Тарифы и оплата</h2>
                        <div className={styleTariffs.price}>
                            <div className={styleTariffs.price__items}>
                                <img src="/img/tariffs_pro.png" alt="price" />
                                <div className={styleTariffs.price__info}>
                                    <h4>Продвинутый</h4>
                                    <p>• Выгодна для крупных депозитов. <br />
                                    • Фиксированная ежемесячная оплата. <br />
                                    • Подходит тем, кто предпочитает стабильные затраты.
                                    </p>
                                    <span>50$/ 1 месяц</span>
                                    <button>Оформит</button>
                                </div>
                            </div>
                            <div className={styleTariffs.price__items}>
                                <img src="/img/tariffs_ligth.png" alt="price" />
                                <div className={styleTariffs.price__info}>
                                    <h4 className={styleTariffs.price__title}>Профит Лайт</h4>
                                    <p>• Выгодна для депозитов до $2000. <br />
                                    • Оплата через удержание комиссии от прибыли.</p>
                                    <span>10% от профита</span>
                                    <button>Оформит</button>
                                </div>
                            </div>
                        </div>
                </div>

                <Link to="/trade">
                        <div className={styleTariffs.close}>{Close}</div>
                </Link>
            </div>
            <div className={styleTariffs.ball__rigth}></div>
        </div>
    )
}

export default Tariffs