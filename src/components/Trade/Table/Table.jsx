import React, { useState, useEffect } from 'react';
import styleTable from "./table.module.scss";
import axios from 'axios';
import { MEXC_URL } from '../../../utils/const';

const rowsNull = [
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
        {
            tools: undefined,
            buy_quantity: undefined,
            buy_price: undefined,
            sell_price: undefined,
            profit: undefined,
            buy_quantity: undefined,
            data__time: undefined,
        },
]

const Table = ({rows, setRows}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Установите желаемый размер страницы
  
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);

    const year = dateObject.getFullYear().toString().slice(-2);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const fetchData = () => {
  
    axios.get(`${MEXC_URL}/api/user/trades?limit=${pageSize}&offset=${currentPage}`, {
      headers: {
        'Accept': 'application/json',
        "Authorization" : `bearer ${getTokenFromLocalStorage()}` 
      }
    })
      .then(function (response) {
        console.log(response)
        setRows(response.data.trades)
      })
      .catch(function (error) {
      })
      .finally(function () {
      })
  };

  useEffect(() => {
    fetchData();

    if (currentPage === 1) {
      const intervalId = setInterval(() => {
        fetchData();
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [])

  return (
    <div>
      <table>
        <div className={styleTable.table__container}> 
            <thead>
            <tr>
                <th>Кол-во</th>
                <th>Инструмент</th>
                <th>Покупка</th>
                <th>Продажа</th>
                <th>Прибыль</th>
                <th>Время</th>
            </tr>
            </thead>
            <tbody >
            {rows? rows.map((row, index) => (
                <tr key={index}>
                    <td>{row.buy_quantity}</td>
                    <td>{row.symbol}</td>
                    <td>{row.buy_price}</td>
                    <td>{row.sell_price}</td>
                    <td>{row.profit}</td>
                    <td>{formatDateTime(row.date_time)}</td>
                </tr>
            )) : 
            rowsNull.map((row, index) => (
                <tr key={index}>
                    <td>{row.tools}</td>
                    <td>{row.buy_quantity}</td>
                    <td>{row.buy_price}</td>
                    <td>{row.sell_price}</td>
                    <td>{row.profit}</td>
                    <td>{row.date_time}</td>
                </tr>
            ))
            }
            </tbody>
        </div>
      </table>
    </div>
  );
};

export default Table;
