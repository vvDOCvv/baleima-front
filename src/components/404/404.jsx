import { Link } from "react-router-dom";
import style404 from "./404.module.scss";

function Error({isLogged}) {
  return (
    <div className={style404.error}>
        <div className={style404.ball__left}></div>
        <div className={style404.error__item}>
            <h1>404</h1>
            <span>?</span>
            <img src="/img/404__robot.png" alt="robot" />
            <h3>Упс! что-то пошло не так!</h3>
            <p>Кажется, мы не можем найти страницу, которую вы ищете. Попробуйте вернуться назад или перейти на главную страницу.</p>
            {isLogged?
              <Link to="/trade">
                  <button>На главную страницу</button>
              </Link> :                    
              <Link to="/main">
                  <button>На главную страницу</button>
              </Link>
            }
        </div>
        <div className={style404.ball__rigth}></div>
    </div>
  );
}

export default Error;