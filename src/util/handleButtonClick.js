export default (href) => {
    return (e) => {
        window.location.href = href;
    }
}