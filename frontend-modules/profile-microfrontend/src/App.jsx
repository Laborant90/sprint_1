import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import EditProfilePopup from "./components/EditProfilePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";

const App = () => (
   <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
   <EditAvatarPopup
             isOpen={isEditAvatarPopupOpen}
             onUpdateAvatar={handleUpdateAvatar}
             onClose={closeAllPopups}
           />
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)