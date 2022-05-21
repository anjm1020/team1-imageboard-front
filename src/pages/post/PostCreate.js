import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import PostCreateForm from "../../component/post/PostCreateForm";

export default () => {
    return (
        <PostListLayout>
            <Wrapper.Header center>
                <h2>PostCreate</h2>
            </Wrapper.Header>
            <Wrapper.ListBody>
                <PostCreateForm></PostCreateForm>
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}