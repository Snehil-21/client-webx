import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import Routes from "./Routes";
import AuthReducer from "./store/reducers/Auth";
import ProductReducer from "./store/reducers/Product";

function App() {
  const persistConfig = {
    key: "root",
    storage: storage,
  };

  const rootReducer = combineReducers({
    Auth: AuthReducer,
    Product: ProductReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
  const persistedStore = persistStore(store);
  return (
    <div className="App">
      <ToastProvider autoDismissTimeout={5000} autoDismiss>
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <Routes />
          </PersistGate>
        </Provider>
      </ToastProvider>
    </div>
  );
}

export default App;
