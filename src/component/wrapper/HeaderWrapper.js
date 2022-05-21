export default ({children,center}) => {
    let cname = "mt-3 w-100 h-25 d-flex align-items-center "
    cname += center ? "justify-content-center" : "justify-content-between";
    return (
        < div className={cname}>
            {children}
        </div>
    );
};