import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

export default ({post}) => {

    const navigate = useNavigate();

    const {title, content, userId, imgId} = post;
    return (
        <div
            className="w-75 h-100 border border-primary p-3 d-flex flex-column justify-content-start align-items-center">
            <h3 className="mb-3">{title}</h3>
            <span className="mb-3">author : {"[" + userId + "]"}</span>
            <img className="w-50 h-50 mb-3" src={"http://localhost:8080/api/images/" + imgId}/>
            <pre>
                {content}
            </pre>

            <div className="mt-5 w-100 d-flex justify-content-evenly align-items-center">
                <Button
                    className="w-25"
                    type="submit"
                    onClick={()=>navigate('/update')}
                >
                    UPDATE
                </Button>
                <Button className="w-25" type="submit">DELETE</Button>
                <Button
                    className="w-25"
                    type="submit"
                    onClick={()=>navigate('/')}
                >
                    HOME
                </Button>
            </div>
        </div>
    );
};