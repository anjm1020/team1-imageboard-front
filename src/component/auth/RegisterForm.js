import {Form,Button} from "react-bootstrap";

export default () => {
    return (
        <>
            <Form className="w-75 border rounded p-5 pt-4 border-primary">
                <h2 className="mb-5">Register</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};