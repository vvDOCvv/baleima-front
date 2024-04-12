import React, { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ERROR_ROUTE, MAIN_ROUTE, TRADE_ROUTE } from "./const";
import { privateRoutes, publicRoutes,} from "./routes";


const AppRouter = ({isLogged, setIsLogged, }) => {

    return isLogged ? 
    ( 
        <Routes>
          {privateRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          )}
          <Route path="*" element={<Navigate to={TRADE_ROUTE} isLogged={isLogged}/>} />
          {/* <Route element={<Navigate to={TRADE_ROUTE} isLogged={isLogged}/>} /> */}
        </Routes>
    )
    : 
    (
        <Routes>
          {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component setIsLogged={setIsLogged} />}/>
          )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} isLogged={isLogged} />} />
        </Routes>
    );
}
  
export default AppRouter;