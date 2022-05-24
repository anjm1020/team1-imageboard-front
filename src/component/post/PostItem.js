import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useSelector,useDispatch} from "react-redux";

import {deletePost} from "../../module/reducer/post";

export default ({post}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const client = useSelector(({user}) => user.userId);
    const {id, title, content, userId, imgId} = post;

    const onDelete = () => {
        dispatch(deletePost(id));
        navigate("/");
    }

    return (
        <div
            className="w-75 h-100 p-3 d-flex flex-column justify-content-start align-items-center">
            <h3 className="mb-3">{title}</h3>
            {/*<span className="mb-3">author : {"[" + userId + "]"}</span>*/}
            <img className="w-50 h-50 mb-3" src={"http://localhost:8080/api/images/" + imgId}/>
            <pre>
                {content}
            </pre>

            <div className="mt-5 w-100 d-flex justify-content-evenly align-items-center">
                {
                    userId == client && (
                        <>
                            <Button
                                className="w-25"
                                onClick={() => navigate('/post/update/' + id)}
                            >
                                UPDATE
                            </Button>
                            <Button
                                className="w-25"
                                onClick={() => onDelete()}
                            >
                                DELETE
                            </Button>
                        </>
                    )
                }
                <Button
                    className="w-25"
                    type="submit"
                    onClick={() => navigate('/')}
                >
                    HOME
                </Button>
            </div>
        </div>
    );
};