import React, { Suspense, useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { CSpinner, useColorModes } from "@coreui/react";
import "./scss/style.scss";
import DefaultLayout from "./layout/DefaultLayout";
import SignUp from "./components/squad4/SignUp";
import Login from "./components/squad4/Login";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

function App() {
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            {/* Define the Signup route */}
            <Route path="/signup" element={<SignUp />} />
            {/* Define the Login route */}
            <Route path="/login" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
