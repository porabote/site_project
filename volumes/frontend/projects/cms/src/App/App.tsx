import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "../router/Router";
import {AuthContainer} from "@packages/porabote/src/middlewares/Auth";
import {NavsContainer} from "@packages/porabote/src/middlewares/Navs";
import {SettingsContainer} from "@packages/porabote/src/middlewares/Settings";
import ModalContainer from "@packages/porabote/src/widgets/ModalWidget/ModalContainer";

const App = () => {
  return (
    <SettingsContainer>
      <AuthContainer>
        <ModalContainer>
          <NavsContainer>
            <RouterProvider router={router}/>
          </NavsContainer>
        </ModalContainer>
      </AuthContainer>
    </SettingsContainer>
  );
};

export default App;