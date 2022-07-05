import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useSelector,useDispatch} from "react-redux";

import {deletePost} from "../../module/reducer/post";
import ImageDownloadButton from "./ImageDownloadButton";

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
            <img className="w-50 h-50 mb-3" style={{maxHeight:'500px'}} src={"http://"+process.env.REACT_APP_HTTP_URL+"/api/images/" + imgId}/>
            <pre>
                {content}
            </pre>

            <div className="mt-5 w-100 d-flex justify-content-evenly align-items-center">
                {
                    userId == client && (
                        <>
                            <Button
                                className="w-auto"
                                onClick={() => navigate('/post/update/' + id)}
                            >
                                UPDATE
                            </Button>
                            <Button
                                className="w-auto"
                                onClick={() => onDelete()}
                            >
                                DELETE
                            </Button>
                        </>
                    )
                }
                <ImageDownloadButton imageId={imgId}/>
                <Button
                    className="w-auto"
                    type="submit"
                    onClick={() => navigate('/')}
                >
                    HOME
                </Button>
            </div>
        </div>
    );
};