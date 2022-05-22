import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useDispatch,useSelector} from "react-redux";
import {useState} from "react";

import {sendForm} from "../../module/post";


export default () => {

    const userId = useSelector(({user}) => user.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imgFile, setImgFile] = useState(null);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(sendForm({
            userId,
            title,
            content,
            imgFile
        }))
    }

    return (
        <div>
            <Form onSubmit={e => onSubmit(e)} className="w-100 h-100 border rounded p-5 pt-4 border-primary">
                <Form.Group className="mb-3">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter Post Title"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        style={{resize: "none"}}
                        as="textarea"
                        rows={6}
                        name="body"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter Body"/>
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label>Select File</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".jpg,.gif,.png"
                        value={imgFile}
                        onChange={e=>{
                            console.log(e.target.value);
                            setImgFile(e.target.value)
                        }}
                    />
                </Form.Group>
                <div className="w-100 d-flex justify-content-evenly align-items-center">
                    <Button className="w-25" type="submit">SAVE</Button>
                    <Button
                        className="w-25"
                        onClick={() => navigate('/')}
                    >
                        CANCEL
                    </Button>
                </div>
            </Form>
        </div>
    );
}