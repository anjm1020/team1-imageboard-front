import {Form, Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {updatePost} from "../../module/reducer/post";

export default ({post}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // const userId = useSelector(({user}) => user.userId);

    const init = () => {
        setTitle(post.title);
        setContent(post.content);
    }

    const checkFormValidation = () => {
        if (title === "") {
            throw makeErrorMessage("title");
        }
        if (content === "") {
            throw makeErrorMessage("content");
        }
        if (title.length > 20) {
            throw "title's length must be less than 20";
        }
        if (content.length > 255) {
            throw "title's length must be less than 255";
        }
    }

    const makeErrorMessage = (msg) => {
        return "Required : " + msg;
    }

    const onSubmit = e => {
        e.preventDefault();
        try {
            checkFormValidation();
            dispatch(updatePost({
                ...post,
                content,
                title
            }));
            navigate("/");
            console.log({...post, content, title});
        } catch (errMsg) {
            alert(errMsg);
        }
    }


    useEffect(() => {
        init();
    }, []);

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