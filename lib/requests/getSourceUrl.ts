import cache from "./cache";
import { GetSourceUrlPromise } from '../interface';
// @ts-ignore
import { componentList } from './componentList.js'

let WINDOW_MICRO_CONFIG = window.microConfig || {};

const getRemoteListRequest: (config?: any) => Promise<any> = (config) => {
    const { name = '' } = config;
    return new Promise(async (resolve,reject) => {
        if(!WINDOW_MICRO_CONFIG || Object.keys(WINDOW_MICRO_CONFIG).length === 0) {
            WINDOW_MICRO_CONFIG = window.microConfig || {};
        }
        try {
            const list = WINDOW_MICRO_CONFIG[name] || [];
            console.log('componentList',list);
            resolve(list);
        } catch(err) {
            console.error('get component list error',err);
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