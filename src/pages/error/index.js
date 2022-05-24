import Error from "../../component/error/Error";
import {useSelector} from "react-redux";

export default () => {

    const body = useSelector(({exception}) => exception.body);

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center text-center">
            <Error body={body}></Error>
        </div>
    );
};