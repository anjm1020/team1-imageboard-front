import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router";

import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import PostItem from "../../component/post/PostItem";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";

import {loadPost} from "../../module/post";


export default () => {

    const dispatch = useDispatch();

    const post = useSelector(({post}) => post.read);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(loadPost(id));
        }
    },[id]);

    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostView</h3>
                <UserInfo></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                <PostItem post={post}></PostItem>
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}