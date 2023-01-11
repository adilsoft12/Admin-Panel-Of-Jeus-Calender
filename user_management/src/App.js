import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createStoreAndPersistor, setAppConfiguration, LOCALES } from "generic";
import storage from "redux-persist/lib/storage";
import { APP_CONFIG } from "./utils/config";
import { Router } from "./navigation";
import { SnackbarProvider } from "notistack";
import Zoom from "@material-ui/core/Zoom";
// import { StyledEngineProvider } from "@mui/material";


<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>;

const { persistor, store } = createStoreAndPersistor(storage);

window.store = store;

function App() {
  useEffect(() => {
    global.locales = LOCALES;
    global.config = APP_CONFIG;
    setAppConfiguration(APP_CONFIG);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <StyledEngineProvider injectFirst> */}
          <SnackbarProvider maxSnack={3} TransitionComponent={Zoom}>
            <div className="App">
              <Router />
            </div>
          </SnackbarProvider>
        {/* </StyledEngineProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
