import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {imageDownload} from "../../module/reducer/post";

export default ({imageId}) => {


    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(imageDownload(imageId));
    }

    return (
        <>
            <Button
                className="w-auto"
                onClick={() => onClick()}
            >
                Image Download
            </Button>
        </>
    );
}