import React, {useState, useEffect, useContext} from 'react';
import {Api} from "@packages/porabote";
import {NavBarLinkType} from "./NavsTypes";
import {AuthContext} from "@packages/porabote";
import NavsContext from "./NavsContext";
import {ResponseType} from "@porabote/api/ApiTypes";

type AuthPropsType = {
    children: React.ReactNode;
};

const NavsWrapper = (props: { children: React.ReactNode }) => {

    const {isAuth, user} = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched && isAuth && user && user.account_id) {
            getData();
        }
    }, [user]);


    const getData = () => {

        if (!isAuth) {
            return;
        }

        if (isFetched) {
            return;
        }
        setIsFetched(true);
        Api("/navs/action/getTree")
            .onSuccess((response: ResponseType) => {
                setIsFetched(true);
                setData([...response.data]);
            })
            .get();
    }

    const setNavsHandler = (navs: NavBarLinkType[]) => {
        setData([...navs]);
    }

    return (
        <NavsContext.Provider value={{data, setNavs: setNavsHandler}}>
            {props.children}
        </NavsContext.Provider>
    );
}

export default NavsWrapper;