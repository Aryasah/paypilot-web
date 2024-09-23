import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";


// sidebar nav config
import navigation from "../_nav";
import { setSidebar } from "src/store/store";

const AppSidebar = () => {
  const dispatch = useDispatch();
  // Access sidebar state values using useSelector
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable); // Assuming unfoldable is part of the sidebar state

  // Dispatch the action with the updated sidebarShow value
  const handleSidebarVisibility = (visible) => {
    dispatch(setSidebar({ sidebarShow: visible }));
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        handleSidebarVisibility(visible);
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand style={{
          textDecoration: 'none',
        }} to="/">
          {!unfoldable ? <p className="ms-2 text-primary animated-text mb-0 " style={{
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '1.2',
            letterSpacing: '0.2px',
            color: '#1e1e1e',
            textDecoration: 'none',
            border: 'none',
          }}>
            PayPilot
          </p>
          :
          <p className="ms-2 text-primary animated-text mb-0 " style={{
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '1.2',
            letterSpacing: '0.2px',
            color: '#1e1e1e',
            textDecoration: 'none',
            border: 'none',
          }}>
            PP  
          </p>
          }
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => handleSidebarVisibility(false)}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch(setSidebar({ sidebarUnfoldable: !unfoldable }))
          }
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
