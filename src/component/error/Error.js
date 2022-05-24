export default ({body}) => {
    const {exceptionType, detail} = body;
    const {code, msg} = exceptionType;
    return (
        <div>
            <h2>{code + " : " + msg}</h2>
            <span>{detail}</span>
            <a href="/">
                <h3>Go home</h3>
            </a>
        </div>
    );
};