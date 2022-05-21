import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";
import PostUpdateForm from "../../component/post/PostUpdateForm";

export default () => {
    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostUpdate</h3>
                <UserInfo user={{name:"testUser"}}></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                <PostUpdateForm></PostUpdateForm>
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}