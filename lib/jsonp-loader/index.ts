const jsonpLoader = ({
    url,
    componentName
}: any) => {
    if(!url) {
        throw Error('invalid url');
    }
    
    return Promise.resolve({
        url,
        componentName
    });
}
export default jsonpLoader;