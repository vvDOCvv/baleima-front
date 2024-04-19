import { useEffect, useState } from "react";
import Socket from "./cryptaWebSocket.module.scss";

const CryptaWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const [kasPrice, setKasPrice] = useState("0.00");
    const [btcPrice, setBtcPrice] = useState("0.00");

    useEffect(() => {
        const ws = new WebSocket('wss://wbs.mexc.com/ws');
  
        //   const intervalId = setInterval(() => {
        //     fetchBalanceProfit();
        //     fetchTotalProfit();
        //   }, 30000);
    
        //   return () => clearInterval(intervalId);
    
        ws.addEventListener('open', (event) => {
    
          const subscriptionRequest = {
            method: 'SUBSCRIPTION',
            params: [
              'spot@public.deals.v3.api@KASUSDT', // KAS/USDT
              'spot@public.deals.v3.api@BTCUSDT'  // BTC/USDT
            ],
          };
    
          ws.send(JSON.stringify(subscriptionRequest));
        });
    
        ws.addEventListener('message', (event) => {
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
        
        ws.addEventListener('close', (event) => {
          setSocket(null);
        });
    
        ws.addEventListener('error', (event) => {
        });
    
        setSocket(ws);
  
        return () => {
            // Закрываем WebSocket соединение при размонтировании
            if (socket) {
                socket.close();
            }
        };
      }, [])

    return(
        <>
            <div>
                <h4>KASUSDT</h4>
                    <div className={Socket.trade__balance__second}>
                        <div className={Socket.trade__balance__head}>
                            <span>{kasPrice}</span>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <h4>BTCUSDT</h4>
                    <div className={styleTrade.trade__balance__second}>
                        <div className={styleTrade.trade__balance__head}>
                            <span>{btcPrice}</span>
                        </div>
                    </div>
                </div> */}
             </>
    )
}

export default CryptaWebSocket;