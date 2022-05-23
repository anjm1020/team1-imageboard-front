import {Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {register} from "../../module/user";
import {useNavigate} from "react-router";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCf, setPasswordCf] = useState("");

    const [errMsg, setErrMsg] = useState(null);
    const isRegisterSuccess = useSelector(({user}) => user.isRegisterSuccess);

    const checkPasswordValidation = () => {
        if (passwordCf !== password) {
            setErrMsg("Passwords do not match");
            return false;
        }
        return true;
    }

    const onSubmit = e => {
        console.log("call signup");
        e.preventDefault();
        if(checkPasswordValidation()){
            dispatch(register({
                email,
                username,
                password
            }));
        } else {
            setPassword("");
            setPasswordCf("");
        }
    }

    useEffect(()=>{
        if (isRegisterSuccess) {
            alert("회원가입이 완료되었습니다");
            navigate("/");
        }
    },[isRegisterSuccess]);

    return (
        <>
            <Form onSubmit={e=>onSubmit(e)} className="w-75 border rounded p-5 pt-4 border-primary">
                <h2 className="mb-3">Register</h2>
                {
                    errMsg && <span className="text-danger fw-bolder">{errMsg}</span>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        name="passwordConfirm"
                        type="password"
                        value={passwordCf}
                        onChange={e => setPasswordCf(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};