import {Pagination} from "react-bootstrap";

export default () => {
    const items = ["1", "2", "3", "4"];
    const active = 1;
    return (
        <div>
            <Pagination>
                {
                    items.map(i=>(
                        <Pagination.Item key={i} active = {i==active}>
                            {i}
                        </Pagination.Item>
                    ))
                }
            </Pagination>
        </div>
    );
}