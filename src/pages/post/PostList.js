import {useEffect} from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import {PostListLayout} from "../../layout";
import PostCard from "../../component/post/PostCard";
import * as Wrapper from "../../component/wrapper";
import PageButton from "../../component/post/PageButton";
import UserInfo from "../../component/user/UserInfo";
import SiteName from "../../component/common/SiteName";
import handleButtonClick from "../../util/handleButtonClick";

import {loadList} from "../../module/postlist";

export default () => {

    const dispatch = useDispatch();
    const {list,pageNumber} = useSelector(({postList})=>({
        list : postList.list,
        pageNumber : postList.pageNumber
    }));

    useEffect(() => {
        dispatch(loadList(pageNumber));
    }, [pageNumber]);

    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostList</h3>
                <UserInfo></UserInfo>
            </Wrapper.Header>
            <Button className="mb-2" onClick={handleButtonClick("/post/create")}>Create Post</Button>
            <Wrapper.ListBody>
                {
                    list.map(post => {
                        return (
                            <PostCard key={post.id} post={post}/>
                        );
                    })
                }
            </Wrapper.ListBody>
            <Wrapper.Footer>
                <PageButton></PageButton>
            </Wrapper.Footer>
        </PostListLayout>
    );
};