import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import PostCreateForm from "../../component/post/PostCreateForm";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";

export default () => {
    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostCreate</h3>
                <UserInfo user={{name:"testUser"}}></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                <PostCreateForm></PostCreateForm>
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}