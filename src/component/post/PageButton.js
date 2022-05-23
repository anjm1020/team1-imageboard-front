import {PageItem, Pagination} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setPageNumber} from "../../module/postlist";

export default ({listLength,pageNumber}) => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);

    const onClick = (i) => {
        dispatch(setPageNumber(i));
    }

    useEffect(() => {
        setList(makeList(listLength));
    }, [listLength]);

    const makeList = (length) => {

        if (length == 0) {
            return [1];
        }
        let list = [];

        for (let i = 0; i <= (length / 10); i++) {
            list.push(i);
        }
        return list;
    }

    return (
        <div>
            <Pagination>
                {
                    list && (
                        list.map(i => (
                            <PageItem active={i == pageNumber} key={i} onClick={() => onClick(i)}>
                                {i+1}
                            </PageItem>
                        ))
                    )
                }
            </Pagination>
        </div>
    );
}