import {PostListLayout} from "../../layout";
import PostCard from "../../component/post/PostCard";
import * as Wrapper from "../../component/wrapper";
import PageButton from "../../component/post/PageButton";
import UserInfo from "../../component/user/UserInfo";
import SiteName from "../../component/common/SiteName";

export default () => {

    const list = [];
    for (let i = 0; i < 10; i++) {
        list.push("");
    }

    return (
        <PostListLayout>
            <Wrapper.Header>
                <SiteName></SiteName>
                <h3>PostList</h3>
                <UserInfo user={{name:"testUser"}}></UserInfo>
            </Wrapper.Header>
            <Wrapper.ListBody>
                {
                    list.map(l => {
                        return (
                            <PostCard/>
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