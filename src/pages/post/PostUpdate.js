import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";


import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";
import PostUpdateForm from "../../component/post/PostUpdateForm";
import {loadPost} from "../../module/reducer/post";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    const {post,userId,isFail} = useSelector((state) => ({
        post : state.post,
        userId : state.user.userId,
        isFail: state.post.err.load,
    }));

    useEffect(() => {
        if (id) {
            dispatch(loadPost(id));
        }
    }, [id]);

    useEffect(() => {
        if (userId && post && post.userId !== userId) {
            alert("Forbidden");
            navigate("/");
        }
    }, [post]);

    useEffect(() => {
        if (isFail) {
            alert("Not Found");
            navigate("/");
        }
    }, [isFail]);

    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostUpdate</h3>
                <UserInfo></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                {post ? (
                    <PostUpdateForm post={{...post,id}}></PostUpdateForm>
                ) : (
                    <h2>Post Loading..</h2>
                )}
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}