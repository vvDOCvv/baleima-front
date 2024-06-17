import { Link } from "react-router-dom";
import styleMain from "./main.module.scss";
import { useEffect } from "react";

function Main (){
    // useEffect(()=>{
        
    // },[])
    
    return(
        <div className={styleMain.container}>
            <div className={styleMain.header__ball__left}></div>
            <header>
                <img src="/img/logo.png"/>
                <nav>
                    {/* <div className="">RU</div> */}
                    <Link to="/main/sign-in">
                        <button>войти</button>
                    </Link>
                    <Link to="/main/sign-up">
                        <button>зарегистрироваться</button>
                    </Link>
                </nav>
            </header>

            <main>
                <div className={styleMain.main__items}>
                    <h5>криптовалютный торговый бот</h5>
                    <h1>ЛУЧШИЙ БОТ ДЛЯ СПОТОВОЙ ТОРГОВЛИ</h1>
                    <p>Наш сайт - это способ заработать с минимальным риском на росте цены криптовалют с помощью автоматизированного бота!</p>
                    <Link to="/main/sign-up">
                        <button>зарегистрироваться</button>
                    </Link>
                </div>
                <div className={styleMain.main__items}>
                    <div className={styleMain.main__robot}>
                        {/* <img src="/img/main_robot.png" alt="robot" /> */}
                    </div>
                    <div className={styleMain.allinfo}>
                        <div className={styleMain.allinfo__items}>
                            <div>
                                +16 700
                                <span> USD</span>
                            </div>
                            <p>Общий профит сайта</p>
                        </div>
                        <div className={styleMain.vectors}></div>
                        <div className={styleMain.allinfo__items}>
                            <div>
                                +4000
                                <span> K</span>
                            </div>
                            <p>Всего сделок</p>
                        </div>
                        <div className={styleMain.vectors}></div>
                        <div className={styleMain.allinfo__items}>
                            <div>
                                +16,7
                                <span> %</span>
                            </div>
                            <p>Текущий доход за месяц</p>
                        </div>
                    </div>
                </div>
            </main>
            <div className={styleMain.main__ball__rigth}></div>

            <div className={styleMain.about}>
                <h2>о платформе</h2>
                <p>Добро пожаловать на athkeeper.com! <br />Успешному росту личного капитала способствует минимизация рисков. <br />В то же время, мы уверены, любой капитал должен приносить прибыль, будь то депозит в банке, оффлайн бизнес, трейдинг или инвестирование. Наша платформа разработана с учетом этого принципа, предлагая Вам стабильный и безопасный источник дохода, свободный от эмоциональных колебаний и Ваших личных эмоций. <br />Очень простой, но в тоже время эффективный алгоритм сайта покупает криптовалюту и продает ее при незначительном повышении цены, затем снова повторяет этот цикл.<br />В итоге у Вас будут только те сделки, которые принесли Вам прибыль!<br />Присоединяйтесь, чтобы начать Ваш путь к финансовой независимости вместе с нами.<br />Be FOMOless</p>
            </div>

            <div className={styleMain.safely__ball__left}></div>
            <div className={styleMain.safely}>
                <div className={styleMain.safely__items}>
                    <div className={styleMain.safely__items__row}>
                        <h2>безопасно</h2>
                        <div>
                            <h4>Ваши средства в безопасности</h4>
                            <p>Ваши средства остаются на вашем аккаунте на криптобирже.</p>
                        </div>
                    </div>
                    <div className={styleMain.safely__items__row}>
                        <h2>удобно</h2>
                        <div>
                            <h4><span>Нужно только</span> API-ключи</h4>
                            <p>Вы создаете API-ключи на своей бирже и предоставляете их нам.</p>
                        </div>
                    </div>
                    <div className={styleMain.safely__items__row}>
                        <h2>эффективно</h2>
                        <div>
                            <h4>и <span>желание</span> заработать</h4>
                            <p>Наш бот торгует на вашем аккаунте на бирже, но не имеет доступа к вашим средствам, кроме как для торговли.</p>
                        </div>
                    </div>

                </div>
                <div className={styleMain.safely__text}>
                    <p>ATHKEEPER не имеет и никогда не будет иметь доступа к вашим средствам.</p>
                    <p>Наша платформа исполняет сделки, сохраняя всю информацию конфиденциальной.</p>
                </div>
                <Link to="/main/sign-in">
                    <button>Торговать</button>
                </Link>
            </div>
            <div className={styleMain.safely__ball__rigth}></div>

            <div className={styleMain.advantages}>
                <h2>Преимущества</h2>
                <div className={styleMain.advantages__rows}>
                    <div>
                        <img src="/img/profit.png" alt="advantages" />
                        <p>Доходность <br /> от <span>4% /мес.</span> в USD</p>
                    </div>
                    <div>
                        <img src="/img/spot.png" alt="advantages" />
                        <p>Исключительно <span>спотовая</span> торговля BTC, ETH, KAS</p>
                    </div>
                    <div>
                        <img src="/img/fixation.png" alt="advantages" />
                        <p>Фиксация доходов в <span>стейблкоинах</span> USDT, USDC</p>
                    </div>
                </div>
            </div>

            <div className={styleMain.ready__ball__left}></div>
            <div className={styleMain.ready}>
                <div className={styleMain.ready__items}>
                    <h2>Готовы к изменениям?</h2>
                    <p>Мы понимаем, что решение о закрытии депозита, опасения пропустить выгодный момент и постоянное наблюдение за графиками могут быть утомительными. </p>
                    <span>Давайте упростим процесс:</span>
                </div>
                <div className={styleMain.ready__items}>
                    <h3>Зарегистрируйтесь</h3>
                    <h3>Подключите вашу биржу</h3>
                    <h3>начните торговать</h3>
                    <Link to="/main/sign-in">
                        <button>Торговать</button>
                    </Link>
                </div>
            </div>
            <div className={styleMain.ready__ball__rigth}></div>

            <footer>
                <img src="/img/logo.png" alt="logo" className={styleMain.footer__img}/> 
                <nav>
                    <div>
                        <span>Contact us</span>
                        <a href="https://t.me/athkeeper">t.me/athkeeper</a>
                    </div>
                    <div>
                        <span>designer</span>
                        <a href="https://t.me/Mariinashora">t.me/Mariinashora</a>
                    </div>
                </nav>
                <button>
                    <img src="/img/scroll__up.png" alt="scroll up" />
                </button>
            </footer>
        </div>
    )
}

export default Main