import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

export default () => {

    const navigate = useNavigate();

    return (
        <Form className="w-50 h-100 border rounded p-5 pt-4 border-primary">
            <Form.Group className="mb-3">
                <Form.Label>Post Title</Form.Label>
                <Form.Control type="text"
                              name="title"
                              placeholder="Enter Post Title"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Body</Form.Label>
                <Form.Control style={{resize: "none"}}
                              as="textarea"
                              name="body"
                              rows={6}
                              placeholder="Enter Body"/>
            </Form.Group>

            <Form.Group className="mb-5">
                <Form.Label>Select File</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <div className="w-100 d-flex justify-content-evenly align-items-center">
                <Button className="w-25" type="submit">SAVE</Button>
                <Button
                    className="w-25"
                    type="submit"
                    onClick={()=>navigate('/')}
                >
                    CANCEL
                </Button>
            </div>
        </Form>
    );
}