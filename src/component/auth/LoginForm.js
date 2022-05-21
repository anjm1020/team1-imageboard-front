import handleButtonClick from "../../util/handleButtonClick";
import {Form,Button} from "react-bootstrap";

export default () => {
    return (
        <>
            <Form className="w-50 border rounded p-5 pt-4 border-primary">
                <h2 className="mb-5">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button className="w-100 mb-2" variant="primary" onClick={handleButtonClick("/register")} >
                    Sign-in
                </Button>
                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};