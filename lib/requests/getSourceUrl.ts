import cache from "./cache";
import { GetSourceUrlPromise } from '../interface';
// @ts-ignore
import { componentList } from './componentList.js'

// let WINDOW_MICRO_CONFIG = window.microConfig || {};

// const getRemoteListRequest: (config?: any) => Promise<any> = (config) => {
//     const { name = '' } = config;
//     return new Promise(async (resolve,reject) => {
//         if(!WINDOW_MICRO_CONFIG || Object.keys(WINDOW_MICRO_CONFIG).length === 0) {
//             WINDOW_MICRO_CONFIG = window.microConfig || {};
//         }
//         try {
//             const list = WINDOW_MICRO_CONFIG[name] || [];
//             console.log('componentList',list);
//             resolve(list);
//         } catch(err) {
//             console.error('get component list error',err);
//             reject([])
//         }
//     });
// }

async function findComponent(componentName: string, version: string) {
    try {
      const response = await fetch('http://localhost:4000/components/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          componentName: componentName,
          version: version
        })
      });
      console.log('response',response);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('查找组件失败:', error);
      throw error;
    }
  }

const getSourceUrl: GetSourceUrlPromise = async ({
    name = '',
    version = ''
}) => {
    const cacheUrl = cache.getComponentSourceUrl({
        name,
        version
    })
    if(cacheUrl) {
        return Promise.resolve(cacheUrl);
    }
    console.log('findComponent',name,version);
    const sourceUrl = await findComponent(name, version);
    console.log('sourceUrl',sourceUrl);
    
    return Promise.resolve(sourceUrl);
}
export default getSourceUrl;