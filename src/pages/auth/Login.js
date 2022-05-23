import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";


import {CenterLayout} from "../../layout";
import LoginForm from "../../component/auth/LoginForm";
import * as Wrapper from "../../component/wrapper";


export default () => {

    const navigate = useNavigate();
    const username = useSelector(({user}) => user.user);

    useEffect(() => {
        if (username) navigate("/");
    }, [navigate, username]);

    return (
        <CenterLayout>
            <Wrapper.Form>
                <LoginForm/>
            </Wrapper.Form>
        </CenterLayout>
    );
};