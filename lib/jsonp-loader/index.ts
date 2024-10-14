import cache from "../requests/cache";

let currentModule: any = null;
const HOOK_NAME = 'remote_component_hook';

const getCurrentModule = () => {
    // @ts-ignore
    window[HOOK_NAME] = function(modules) {
        currentModule = modules
    }
}

const jsonpLoader = ({
    url,
    version,
    componentName
}: any) => {
    if(!url) {
        throw Error('invalid url');
    }
    // @ts-ignore
    const remoteCurrentModules = window[`remote_${componentName}`];
    if(remoteCurrentModules) {
        return Promise.resolve(remoteCurrentModules);
    }
    const cacheComponent = cache.getTargetComponentCache({
        name:componentName,
        version
    })
    if(cacheComponent) {
        return cacheComponent;
    }
    const p = new Promise<any>((resolve, reject) => {
        const script = document.createElement('script');
        const head = document.querySelector('head');
        getCurrentModule();
        script.src = `${url}?timeStamp=${new Date().getTime()}`;
        script.crossOrigin = 'anonymous';
        if(head) {
            head.appendChild(script);
            script.onload = () => {
                resolve(currentModule)
            }
            script.onerror = (err) => {
                reject(err);
            }
        }
    })
    cache.setTargetComponentCache({
        name:componentName,
        version,
        component: p,
    })
    return p;
}
export default jsonpLoader;