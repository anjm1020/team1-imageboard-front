import {useEffect} from "react";
import {useNavigate} from "react-router";

export default () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/post");
    });

    return (
        <></>
    );
}