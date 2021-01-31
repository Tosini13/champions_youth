import { Drawer } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { mainTheme } from "../../../styled/styledConst";

import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const DrawerStyled = styled(Drawer)`
    .MuiDrawer-paper{
        background-color: ${mainTheme.palette.primary.dark};
        color: ${mainTheme.palette.secondary.main};
        min-width: 250px;
    }
`;

const MenuSideBar = ({
    handleCloseSideBar,
    sideBarMenuOpened,
    loggedIn,
}) => {
    return (
        <DrawerStyled
            open={sideBarMenuOpened}
            onClose={handleCloseSideBar}
            color="secondary"
            variant="temporary"
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}>
            {loggedIn ? (
                <SignedInMenu handleCloseSideBar={handleCloseSideBar} />
            ) : (
                    <SignedOutMenu handleCloseSideBar={handleCloseSideBar} />
                )}
        </DrawerStyled>
    );
};

const mapStateToProps = (state) => {
    const loggedIn = Boolean(state.firebase.auth.uid);
    return {
        loggedIn,
    };
};

export default connect(mapStateToProps)(MenuSideBar);
