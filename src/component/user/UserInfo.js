import {Button} from "react-bootstrap";

export default ({user}) => {
    return (
        <div className="w-25 d-flex justify-content-center align-items-center">
            {
                user && <span className="fs-5 fw-bold m-lg-2">{user.name}</span>
            }
            <Button>
                {
                    user ? "Logout" : "Login"
                }
            </Button>
        </div>
    );
};