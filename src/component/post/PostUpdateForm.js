import {Form, Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";

import {updatePost} from "../../module/post";

export default ({post}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
    }, []);

    useEffect(()=>{
        console.log(content);
    },[content])

    const onSubmit = e => {
        e.preventDefault();
        dispatch(updatePost({
            id:post.id,
            userId:post.userId,
            title,
            content,
            imgId : post.imgId
        }));
        navigate("/");
    }

    return (
        <Form onSubmit={e => onSubmit(e)} className="w-50 h-100 border rounded p-5 pt-4 border-primary">
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

            <div className="w-100 d-flex justify-content-evenly align-items-center">
                <Button className="w-25" type="submit">SAVE</Button>
                <Button
                    className="w-25"
                    type="submit"
                    onClick={() => navigate('/')}
                >
                    CANCEL
                </Button>
            </div>
        </Form>
    );
}