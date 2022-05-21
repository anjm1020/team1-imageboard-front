export default ({children,register}) => {
    let _classname = "d-flex justify-content-center align-items-center ";
    _classname += register ? "w-50 h-75" : "w-50 h-50";
    console.log(_classname);
    return (
        <div className={_classname}>
            {children}
        </div>
    );
};
