import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk'
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Esta linea sirve para conectar el store con el redux devtools en el navegador

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//Esta linea sirve para que podamos hacer peticiones a una API/servidor
);

export default store;