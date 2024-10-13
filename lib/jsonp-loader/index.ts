const jsonpLoader = ({
    url,
    componentName
}: any) => {
    return Promise.resolve({
        url,
        componentName
    });
}
export default jsonpLoader;