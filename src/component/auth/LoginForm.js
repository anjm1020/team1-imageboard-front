import {Form,Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router";
import {useSelector,useDispatch} from "react-redux";

import {login} from "../../module/user";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isSuccess,username,errMsg} = useSelector(({user}) => ({
        isSuccess : user.login.isSuccess,
        username: user.user,
        errMsg : user.login.errMsg
    }));

    console.log(isSuccess);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        dispatch(login({
            email,
            password,
        }));
    }

    useEffect(() => {
        if(isSuccess||username){
            navigate("/");
        }
    }, [isSuccess,username]);

    return (
        <>
            <Form onSubmit={e=>onSubmit(e)} className="w-50 border rounded p-5 pt-4 border-primary">
                <h2 className="mb-5">Login</h2>
                {
                    errMsg && <span className="text-danger fw-bolder">{errMsg}</span>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <a href="/register">Register</a>
                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};