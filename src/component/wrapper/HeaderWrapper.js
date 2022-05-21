export default ({children,center}) => {
    let cname = "w-100 h-auto mt-5 mb-5 d-flex align-items-center "
    cname += center ? "justify-content-center" : "justify-content-between";
    return (
        < div className={cname}>
            {children}
        </div>
    );
};