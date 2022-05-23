import {Card, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

export default ({post}) => {

    const navigate = useNavigate();
    const {id,title, content, img_id} = post;

    return (
        <Card style={{width: '16%'}} className="m-2">
            <Card.Img variant="top" src={"http://localhost:8080/api/images/" + img_id}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate('/post/' + id)}>Read</Button>
            </Card.Body>
        </Card>
    );
};
