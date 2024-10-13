import cache from "./cache";
import { GetSourceUrlPromise } from '../interface';
// @ts-ignore
import { componentList } from './componentList.js'

const getRemoteListRequest: (config?: any) => Promise<any> = () => {

    return new Promise(async (resolve,reject) => {
        // 后续改为从配置平台获取
        try {
            const list = componentList.filter((item: any) => {
                const { name = '', version = '' } = item;
                return item?.name === name && item?.version === version;
               })
            resolve(list);
        } catch(err) {
            reject([])
        }
    });
}

const getSourceUrl: GetSourceUrlPromise = async ({
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
    const fetchPromise = getRemoteListRequest({
        name,
        version
    });
    const list: Array<any> = await fetchPromise;
    const targetComponentConfig = list?.length ? list[0] : {};
    return Promise.resolve(targetComponentConfig);
}
export default getSourceUrl;