import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

import {createPost} from "../../module/post";


export default () => {

    const inputRef = useRef();

    const userId = useSelector(({user}) => user.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imgFile, setImgFile] = useState(undefined);

    const onSubmit = e => {
        e.preventDefault();
        console.log(imgFile);
        dispatch(createPost({
            userId,
            title,
            content,
            imageName: imgFile.name,
            file: imgFile,
        }));
        navigate("/");
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
                        onChange={() => setImgFile(inputRef.current.files[0])}
                        ref={inputRef}
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