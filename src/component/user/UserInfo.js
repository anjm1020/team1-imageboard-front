import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {logout} from "../../module/reducer/user";
import {useEffect} from "react";

export default () => {

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
    }

    useEffect(()=>{

    },[user])

    return (
        <div className="w-25 d-flex justify-content-center align-items-center">
            {
                user && <span className="fs-5 fw-bold m-lg-2">{user}</span>
            }
            {
                user ? (
                    <Button onClick={onLogout}>
                        LOGOUT
                    </Button>
                ) : (
                    <Button onClick={()=>navigate('/login')}>
                        LOGIN
                    </Button>
                )
            }
        </div>
    );
};