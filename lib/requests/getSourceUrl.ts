import cache from "./cache";
import { GetSourceUrlPromise } from '../interface'

const getSourceUrl: GetSourceUrlPromise = ({
    name,
    version
}) => {
    const cacheUrl = cache.getComponentSourceUrl({
        name,
        version
    })
    if(cacheUrl) {
        return Promise.resolve(cacheUrl);
    }
    return Promise.resolve()

}
export default getSourceUrl;