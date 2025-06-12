import cache from "./cache";
import { GetSourceUrlPromise } from '../interface';
import config from '../config';

async function findComponent(componentName: string, version: string) {
    if (!config.apiUrl) {
        throw new Error('请先调用 initMicro 初始化接口地址');
    }

    try {
        const response = await fetch(`${config.apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                componentName: componentName,
                version: version,
                projectName: config.projectName
            })
        });
        
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