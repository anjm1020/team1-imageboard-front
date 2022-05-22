import {CenterLayout} from "../../layout";
import RegisterForm from "../../component/auth/RegisterForm";
import * as Wrapper from "../../component/wrapper";


export default () => {
    return (
        <CenterLayout>
            <Wrapper.Form register>
                <RegisterForm/>
            </Wrapper.Form>
        </CenterLayout>
    );
};