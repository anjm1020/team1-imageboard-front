import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";
import PostUpdateForm from "../../component/post/PostUpdateForm";
import {loadPost} from "../../module/reducer/post";
import {emitError} from "../../module/reducer/error";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    const {post, userId} = useSelector((state) => ({
        post: state.post,
        userId: state.user.userId,
    }));

    useEffect(() => {
        if (id) {
            dispatch(loadPost(id));
        }
    }, [id]);

    // 자신의 포스트가 아닐 때 : Forbidden
    // ! BE 구현으로 변경 필요
    useEffect(() => {
        if (!userId || (post && post.userId !== userId)) {
            dispatch(emitError({
                exceptionType: {
                    code: 403,
                    msg: "Forbidden"
                },
                detail: "Not Allowed Post",
            }));
            navigate("/");
        }
    }, [post,userId]);

    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostUpdate</h3>
                <UserInfo></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                {post ? (
                    <PostUpdateForm post={{...post, id}}></PostUpdateForm>
                ) : (
                    <h2>Post Loading..</h2>
                )}
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}