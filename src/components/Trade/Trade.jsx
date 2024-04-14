import { Link } from "react-router-dom"
import styleTrade from "./trade.module.scss";
import Table from "./Table/Table";
import {Exit, MEXC_URL } from "../../utils/const";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

function Trade ({setIsLogged}){
    const symbolTrade = ["KASUSDT", "BTCUSDT",];
    const [isModalAdvice, setModalAdvice] = useState(false);
    const [kasPrice, setKasPrice] = useState("0.00");
    const [btcPrice, setBtcPrice] = useState("0.00");
    
    const [changeUserTrade, setChangeUserTradeDispatch] = useReducer(reducerUserTrade, {
        symbol_to_trade: "",
        trade_quantity: "",
        trade_percent: "",
        bif_is_active: "",
        bif_percent_1: "",
        bif_percent_2: "",
        bif_percent_3: "",
    })

    const [userInfo, setUserInfo] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState('');

    const [balance, setBalance] = useState(0);
    const [atProfit, setAtProfit] = useState(0);
    const [rows, setRows] = useState([]);

    function reducerUserTrade(changeUserTrade, action){
        switch (action.type) {
          case "initial_data":
            return {...changeUserTrade, ...action.payload}
          case "trade_quantity":
            return {...changeUserTrade, trade_quantity: action.value}
          case "trade_percent":
            return {...changeUserTrade, trade_percent: action.value}
          case "bif_is_active":
            console.log(changeUserTrade.bif_is_active)
            return {...changeUserTrade, bif_is_active: !changeUserTrade.bif_is_active}
          case "bif_percent_1":
            return {...changeUserTrade, bif_percent_1: action.value}
          case "bif_percent_2":
            return {...changeUserTrade, bif_percent_2: action.value}
          case "bif_percent_3":
            return {...changeUserTrade, bif_percent_3: action.value}
          case "symbol_to_trade":
            return {...changeUserTrade, symbol_to_trade: action.value}
          default:
              return changeUserTrade;
        }
    }
    
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
    
            const setBifPercent = {
                trade_quantity: response.data.trade_quantity,
                trade_percent: response.data.trade_percent,
                symbol_to_trade: response.data.symbol_to_trade,
                bif_is_active: response.data.bif_is_active,
                bif_percent_1: response.data.bif_percent_1,
                bif_percent_2: response.data.bif_percent_2,
                bif_percent_3: response.data.bif_percent_3,
            }

            setUserInfo(response.data)
            setButtonDisabled(response.data.auto_trade)
            setChangeUserTradeDispatch({ type: "initial_data", payload: setBifPercent });
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
          setRows(response.data.trades)
          setAtProfit(+response.data.total_profit)
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        })
    };
  
    useEffect(() => {
      const wsUrl = 'wss://wbs.mexc.com/ws';
      const socket = new WebSocket(wsUrl);

      fetchBalanceProfit();
      fetchTotalProfit()
      getProfile()

      //   const intervalId = setInterval(() => {
      //     fetchBalanceProfit();
      //     fetchTotalProfit();
      //   }, 30000);
  
      //   return () => clearInterval(intervalId);
  
      socket.addEventListener('open', (event) => {
        // console.log('WebSocket connected');
  
        const subscriptionRequest = {
          method: 'SUBSCRIPTION',
          params: [
            'spot@public.deals.v3.api@KASUSDT', // KAS/USDT
            'spot@public.deals.v3.api@BTCUSDT'  // BTC/USDT
          ],
        };
  
        socket.send(JSON.stringify(subscriptionRequest));
      });
  
      socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
      
          // Обработка для KAS/USDT
          if (
            data &&
            data['s'] === 'KASUSDT' &&
            data['d'] &&
            data['d']['deals'] &&
            data['d']['deals'].length > 0 &&
            data['d']['deals'][0]['p']
          ) {
            setKasPrice(data['d']['deals'][0]['p']);
          }
      
          // Обработка для BTC/USDT
          if (
            data &&
            data['s'] === 'BTCUSDT' &&
            data['d'] &&
            data['d']['deals'] &&
            data['d']['deals'].length > 0 &&
            data['d']['deals'][0]['p']
          ) {
            setBtcPrice(data['d']['deals'][0]['p']);
          }
        } catch (error) {
          // Обработка ошибки парсинга, если нужно
        }
      });
      
      socket.addEventListener('close', (event) => {
        // console.log('WebSocket connection closed');
      });
  
      socket.addEventListener('error', (event) => {
        // console.error('WebSocket error:', event);
      });
  
      return () => {
        // Закрытие соединения при размонтировании компонента
        socket.close();
      };
    }, [])

      function tradeStop(trade) {
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
      }

    const handleTradeClick = (trade) => {
      if(!trade){
        axios.put(`${MEXC_URL}/api/user`, changeUserTrade, {
          headers: {
              'Accept': 'application/json',
              Authorization: `bearer ${getTokenFromLocalStorage()}`, 
            }
        })
        .then(function(response){
          console.log(response)
          tradeStop(trade)
        })
        .catch(function (error) {
            console.log(error)
        })
      }else{
        tradeStop(trade)
      }
    } 

    function restart (){
        axios.post(`${MEXC_URL}/api/user/buy`, null, {
            headers: {
              'accept': 'application/json',
              Authorization: `bearer ${getTokenFromLocalStorage()}`
            }
          })
            .then(function (response) {
              console.log(response)
              tradeStop(true)
            //   if(trade){
            //       if(response.data !== null){
            //           getProfile()
            //           alert("Торговля запущена успешно")
            //       }else{
            //           alert("Недостаточно монет для торговли")
            //       }
            //   }else{
            //       console.log(response)
            //   }
            })
            .catch(function (error) {
              console.log(error)
              alert(error.response)
            });
    }

    const handleRestartTradeClick = () =>{
            axios.put(`${MEXC_URL}/api/user`, changeUserTrade, {
              headers: {
                  'Accept': 'application/json',
                  Authorization: `bearer ${getTokenFromLocalStorage()}`, 
                }
            })
            .then(function(response){
              console.log(response)
              restart()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
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
                                <Link to="/profile">
                                    <button>Добавить</button>
                                </Link>
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
                  <div className={styleTrade.trade__cash}>
                    <div className={styleTrade.trade__balance}>
                          <div>
                              <h4>Баланс</h4>
                              <div className={styleTrade.trade__balance__first}>
                                  <div className={styleTrade.trade__balance__head}>
                                      <span>${balance.toFixed(2)}</span>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <h4>Общий доход</h4>
                              <div className={styleTrade.trade__balance__first}>
                                  <div className={styleTrade.trade__balance__head}>
                                      <span>${atProfit.toFixed(2)}</span>
                                  </div>
                              </div>
                          </div>
                    </div>
                    <div className={styleTrade.trade__well}>
                        <div>
                          <h4>KASUSDT</h4>
                          <div className={styleTrade.trade__balance__second}>
                              <div className={styleTrade.trade__balance__head}>
                                  <span>{kasPrice}</span>
                              </div>
                          </div>
                        </div>
                        <div>
                          <h4>BTCUSDT</h4>
                          <div className={styleTrade.trade__balance__second}>
                              <div className={styleTrade.trade__balance__head}>
                                  <span>{btcPrice}</span>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                    <Table rows={rows}/>
                </div>
                <div className={`${styleTrade.trade__torg} ${isModalAdvice ? styleTrade.trade__torg__withAdvice : ''}`}>
                  <div className={styleTrade.trade__params}>
                    <h3>Параметры</h3>
                      <div className={`${styleTrade.trade__torg__input} ${isModalAdvice ? styleTrade.trade__torg__input__withAdvice : ''}`}>
                          <div>
                              <span>сумма</span>
                              <input 
                                  type="number"
                                  value={changeUserTrade.trade_quantity}
                                  placeholder={changeUserTrade.trade_quantity}
                                  onChange={(e) => setChangeUserTradeDispatch({ type: 'trade_quantity', value: e.target.value }) }
                                  />
                          </div>
                          <div>
                              <span>маржа</span>
                              <input 
                                  type="number" 
                                  value={changeUserTrade.trade_percent}
                                  placeholder={changeUserTrade.trade_percent}
                                  onChange={(e) => setChangeUserTradeDispatch({ type: 'trade_percent', value: e.target.value }) }
                                  />
                          </div>
                          <div className={styleTrade.trade__tools}>
                              <span>инструмент</span>
                              <select className={styleTrade.trade__select} value={changeUserTrade.symbol_to_trade} onChange={(e) => setChangeUserTradeDispatch({ type: 'symbol_to_trade', value: e.target.value }) }>
                                  {symbolTrade.map((e) => e == changeUserTrade.symbol_to_trade ? <option selected>{changeUserTrade.symbol_to_trade}</option> : <option>{e}</option>)}
                              </select>
                          </div>
                          <div className={styleTrade.trade__averag}>
                              <span>устреднение</span>
                              <div onClick={() => setChangeUserTradeDispatch({ type: 'bif_is_active', value: !changeUserTrade.bif_is_active}) } className={styleTrade.trade__down}>
                                  {!changeUserTrade.bif_is_active ? (
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

                              {changeUserTrade.bif_is_active ? 
                                  <div className={styleTrade.bif}>
                                    <span>% устреднение</span>
                                    <div>
                                      <input 
                                          type="number"
                                          value={changeUserTrade.bif_percent_1}
                                          placeholder={changeUserTrade.bif_percent_1}
                                          onChange={(e) => setChangeUserTradeDispatch({ type: 'bif_percent_1', value: e.target.value }) }
                                          />
                                      <input 
                                          type="number"
                                          value={changeUserTrade.bif_percent_2}
                                          placeholder={changeUserTrade.bif_percent_2}
                                          onChange={(e) => setChangeUserTradeDispatch({ type: 'bif_percent_2', value: e.target.value }) }
                                          />
                                      <input 
                                          type="number"
                                          value={changeUserTrade.bif_percent_3}
                                          placeholder={changeUserTrade.bif_percent_3}
                                          onChange={(e) => setChangeUserTradeDispatch({ type: 'bif_percent_3', value: e.target.value }) }
                                          />
                                    </div>
                                  </div>
                                  : null
                              }
    
                      </div>
                      <button disabled={isButtonDisabled}  onClick={() => handleTradeClick(true)}>Торговать</button>
                      <button disabled={!isButtonDisabled}  onClick={() => handleTradeClick(false)}>Стоп</button>
                      <button disabled={!isButtonDisabled}  onClick={() => handleRestartTradeClick()}>Рестарт</button>
                    </div>
                  <div className={styleTrade.trade__advice}>
                          <div>
                              <h5>Рекомендуем: <br />
                                  Сумма ордера: 1/30 от депозита<br />
                                  Маржа: 0.5-0.7%
                              </h5>
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
                    
                </div>
            <div className={styleTrade.ball__rigth}></div>
            </div>
        </>
    )
}

export default Trade