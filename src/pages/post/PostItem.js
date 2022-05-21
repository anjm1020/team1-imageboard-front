import {PostListLayout} from "../../layout";
import * as Wrapper from "../../component/wrapper";
import PostItem from "../../component/post/PostItem";
import SiteName from "../../component/common/SiteName";
import UserInfo from "../../component/user/UserInfo";

export default () => {
    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostView</h3>
                <UserInfo user={{name:"testUser"}}></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                <PostItem></PostItem>
            </Wrapper.ListBody>
            <Wrapper.Footer/>
        </PostListLayout>
    );
}