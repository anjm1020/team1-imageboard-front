export const CenterLayout = ({children}) => {
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            {children}
        </div>
    );
};

export const PostListLayout = ({children}) => {
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            {children}
        </div>
    );
};


