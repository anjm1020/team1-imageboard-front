import {Form,Button} from "react-bootstrap";
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";

import {login, loginFail} from "../../module/reducer/user";

export default () => {

    const dispatch = useDispatch();

    const {errMsg} = useSelector(({user}) => ({
        errMsg : user.login.errMsg
    }));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const makeErrorMessage = (msg) => {
        return "Required : " + msg;
    }

    const checkFormValidation = (email,password) => {
        if (email === "") {
            throw makeErrorMessage("email");
        }

        if (password === "") {
            throw makeErrorMessage("password");
        }
    }


    const onSubmit = e => {
        e.preventDefault();
        try {
            checkFormValidation(email, password);
            dispatch(login({
                email,
                password,
            }));
        } catch (errMsg) {
            dispatch(loginFail(errMsg));
        }
    }

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

                <a href="/auth/register">Register</a>
                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};