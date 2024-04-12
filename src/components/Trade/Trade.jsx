import { Link } from "react-router-dom"
import styleTrade from "./trade.module.scss";
import Table from "./Table/Table";
import {CloseAdvice, Exit, MEXC_URL } from "../../utils/const";
import { useEffect, useState } from "react";
import axios from "axios";

const tools = ["KASUSDT", "BTCUSDT", "ETH",]

function Trade ({setIsLogged}){
    const symbolTrade = ["KASUSDT", "BTCUSDT", "ETHUSDT"];
    const [isModalAdvice, setModalAdvice] = useState(true)
    const [autoTradeMode, setautoTradeMode] = useState(true);

    const [userInfo, setUserInfo] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState('');

    const [balance, setBalance] = useState(0);
    const [atProfit, setAtProfit] = useState(0);
    const [rows, setRows] = useState([]);

    const toggleAutoTrade = () => {
        setautoTradeMode(prevMode => !prevMode);
    }; 

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem("accessToken");
    }; 

    const handleLogout = () => {
        // Дополнительная логика выхода, например, сброс статуса авторизации
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }

    const getProfile = () => {
        axios.get(`${MEXC_URL}/api/user`,{
          headers: {
            'Accept': 'application/json',
            Authorization: `bearer ${getTokenFromLocalStorage()}`, 
          }
        })
          .then(function (response) {
            console.log(response)
            setUserInfo(response.data)
            setButtonDisabled(response.data.auto_trade)
            // setUserInfo({trade_percent: response.data.trade_percent, trade_quantity: response.data.trade_quantity,})
          })
          .catch(function (error) {
            // handle error
          })
          .finally(function () {
            // always executed
          })
    }

    const  fetchBalanceProfit = () =>{
        axios.get(`${MEXC_URL}/api/user/balance?symbol=USDT`,{
            headers: {
              'Accept': 'application/json',
              Authorization: `bearer ${getTokenFromLocalStorage()}` 
            }
          })
          .then(function (response) {
            // handle success
            console.log(response)
            setBalance(+response.data.free)
          })
          .catch(function (error) {
            console.log(error)
            // handle error
          })
          .finally(function () {
            // always executed
          })
    }

    const fetchTotalProfit = () => {
  
      axios.get(`${MEXC_URL}/api/user/trades`, {
        headers: {
          'Accept': 'application/json',
          Authorization : `bearer ${getTokenFromLocalStorage()}` 
        }
      })
        .then(function (response) {
          console.log(response)
          // handle success
          setAtProfit(+response.data.total_profit)
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        })
    };
  
    useEffect(()=>{
        getProfile()

    }, [])

    useEffect(() => {
        fetchBalanceProfit();
        fetchTotalProfit()

          const intervalId = setInterval(() => {
            fetchBalanceProfit();
            fetchTotalProfit();
          }, 30000);
    
          return () => clearInterval(intervalId);

      }, [rows])

    const handleTradeClick = (trade) => {
        axios.post(`${MEXC_URL}/api/user/trades?auto_trade=${trade}`, null, {
          headers: {
            'accept': 'application/json',
            Authorization: `bearer ${getTokenFromLocalStorage()}`
          }
        })
          .then(function (response) {
            console.log(response)
            if(trade){
                if(response.data !== null){
                    getProfile()
                    alert("Торговля запущена успешно")
                }else{
                    alert("Недостаточно монет для торговли")
                }
            }else{
                console.log(response)
                setButtonDisabled(!isButtonDisabled)
                alert("Торговля остановлено")
            }
          })
          .catch(function (error) {
            console.log(error)
            alert(error.response)
          });
      };
    return(
        <>
            <div className={styleTrade.trade}> 
            <div className={styleTrade.ball__left}></div>
                <div className={styleTrade.trade__profile}>
                    <div className={styleTrade.trade__profile__items}>
                        <h4>Профиль</h4>
                        <div></div>
                        <span>{userInfo.first_name} {userInfo.last_name}</span>
                        <Link to="/profile">
                            <button>Редактировать</button>
                        </Link>
                        <div className={styleTrade.trade__profile__data}>
                            <h5>Мой данные</h5>
                            <div>
                                <span>Подписка до:</span>
                                <span>11.10</span>
                            </div>
                            <div>
                                <span>Api-ключи</span>
                                <button>Добавить</button>
                            </div>
                        </div>
                    </div>
                    <div className={styleTrade.nav__exit} onClick={handleLogout} >{Exit} &nbsp; выйти</div>
                </div>
                <div className={styleTrade.trade__profile__laptop}>
                    <div>
                        <h5>{userInfo.first_name} {userInfo.last_name}</h5>
                        <div>
                            <span>Подписка до:</span>
                            <span>11.10</span>
                        </div>
                    </div>
                    <div className={styleTrade.trade__profile__data}>
                        <Link to="/profile">
                            <img src="/img/setting.png" alt="setting" />
                        </Link>
                        <div className={styleTrade.nav__exit} onClick={handleLogout} >{Exit} &nbsp; выйти</div>
                    </div>
                </div>
                <div className={styleTrade.trade__center}>
                    <Table/>
                    <div className={styleTrade.trade__balance}>
                        <div>
                            <h4>Баланс</h4>
                            <div className={styleTrade.trade__balance__first}>
                                <div className={styleTrade.trade__balance__head}>
                                    <span>${balance.toFixed(2)}</span>
                                    <img src="/img/balance__chart.png" alt="balance" />
                                </div>
                                <div className={styleTrade.trade__balance__row}>
                                    <div>
                                        <h5>Profit</h5>
                                        <span className={styleTrade.trade__balance__plus}>+28.87%</span>
                                    </div>
                                    <div>
                                        <h5>Loss</h5>
                                        <span className={styleTrade.trade__balance__minus}>-2.87%</span>
                                    </div>
                                    <div>
                                        <h5>Netral</h5>
                                        <span className={styleTrade.trade__balance__percent}>2.87%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div>
                        <h4>Общий доход</h4>
                        <div className={styleTrade.trade__balance__second}>
                            <div className={styleTrade.trade__balance__head}>
                                <span>${atProfit.toFixed(2)}</span>
                                <img src="/img/profit__chart.png" alt="balance" />
                            </div>
                            <div className={styleTrade.trade__balance__row}>
                                <div>
                                    <h5>Profit</h5>
                                    <span className={styleTrade.trade__balance__plus}>+28.87%</span>
                                </div>
                                <div>
                                    <h5>Loss</h5>
                                    <span className={styleTrade.trade__balance__minus}>-2.87%</span>
                                </div>
                                <div>
                                    <h5>Netral</h5>
                                    <span className={styleTrade.trade__balance__percent}>2.87%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className={`${styleTrade.trade__torg} ${isModalAdvice ? styleTrade.trade__torg__withAdvice : ''}`}>
                    <h3>Параметры</h3>
                    <div className={`${styleTrade.trade__torg__input} ${isModalAdvice ? styleTrade.trade__torg__input__withAdvice : ''}`}>
                        <div>
                            <span>сумма</span>
                            <input 
                                type="number"
                                placeholder={userInfo.trade_quantity}/>
                        </div>
                        <div>
                            <span>маржа</span>
                            <input 
                                type="number" 
                                placeholder={userInfo.trade_percent}/>
                        </div>
                        <div className={styleTrade.trade__tools}>
                            <span>инструмент</span>
                            <select className={styleTrade.trade__select} >
                                {symbolTrade.map((e) => e == userInfo.symbol_to_trade ? <option selected>{e}</option> : <option>{e}</option>)}
                            </select>
                        </div>
                        <div className={styleTrade.trade__averag}>
                            <span>устреднение</span>
                            <div onClick={toggleAutoTrade} className={styleTrade.trade__down}>
                                {autoTradeMode ? (
                                        <div>
                                            <span role="img" aria-label="Light Mode">
                                                да
                                            </span>
                                            <span role="img" aria-label="Dark Mode" className={styleTrade.trade__down__choose}>
                                                нет
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span role="img" aria-label="Light Mode" className={styleTrade.trade__down__choose}>
                                                да
                                            </span>
                                            <span role="img" aria-label="Dark Mode" >
                                                нет
                                            </span>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className={styleTrade.bif}>
                            <span>% устреднение</span>
                            <div>
                                <input 
                                    type="number"
                                    disabled={autoTradeMode}
                                    placeholder="1"/>
                                <input 
                                    type="number"
                                    disabled={autoTradeMode}
                                    placeholder="2"/>
                                <input 
                                    type="number"
                                    disabled={autoTradeMode}
                                    placeholder="3"/>
                            </div>
                        </div>
                    </div>
                    <button disabled={isButtonDisabled}  onClick={() => handleTradeClick(true)}>Торговать</button>
                    <button disabled={!isButtonDisabled}  onClick={() => handleTradeClick(false)}>Стоп</button>
                    {
                        isModalAdvice ?
                        <div className={styleTrade.trade__advice}>
                            <div>
                                <h5>Рекомендуем: <br />
                                    Сумма ордера: 1/30 от депозита<br />
                                    Маржа: 0.5-0.7%
                                </h5>
                                <div onClick={() => setModalAdvice(!isModalAdvice)} className={styleTrade.close__advice}>{CloseAdvice}</div>
                            </div>
                            <div>
                                <p>
                                    При таких настройках риск полного слива депозита в биткоин почти равен нулю. 
                                    В день в среднем происходит от 5 до 30 циклов покупки-продажи.
                                    <br />
                                    Это гарантирует плюс 4%  к депозиту ежемесячно, 48% годовых в долларах.
                                </p>
                                <img src="/img/robot.png" alt="robot__advice"/>
                            </div>
                        </div>
                            :
                        <img 
                            onClick={() => setModalAdvice(!isModalAdvice)} 
                            className={styleTrade.trade__advice__robot} 
                            src="/img/robot.png" 
                            alt="robot__advice"
                        />
                    }
                </div>
            <div className={styleTrade.ball__rigth}></div>
            </div>
        </>
    )
}

export default Trade