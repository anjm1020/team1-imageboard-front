import {CenterLayout} from "../../layout";
import LoginForm from "../../component/auth/LoginForm";
import * as Wrapper from "../../component/wrapper";

export default () => {
    return (
        <CenterLayout>
            <Wrapper.Form>
                <LoginForm/>
            </Wrapper.Form>
        </CenterLayout>
    );
};