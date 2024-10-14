import _cache from 'global-cache';

class Cache {
    private cache = _cache;

    getCachedKey = (prefix: string, name: string, version: string = 'defaultVersion') => `${prefix}-${name}@${version}`;

    getCachedUrlKey = ({ name, version }: any) => this.getCachedKey('url', name, version);

    getCachedComponentKey = ({ name, version }: any) => this.getCachedKey('component', name, version);

    setComponentSourceUrl = ({ name, version, source }: any) => {
        const key = this.getCachedUrlKey({ name, version });
        return this.cache.set(key, source);
    };

    getComponentSourceUrl = ({ name, version }: any): any | null => {
        const key = this.getCachedUrlKey({ name, version });
        return this.cache.has(key) ? this.cache.get(key) : null;
    };

    setTargetComponentCache = ({ name, version, component }: any) => {
        const key = this.getCachedComponentKey({ name, version });
        return this.cache.set(key, component);
    };

    getTargetComponentCache({ name, version }: any): React.ComponentType | null {
        const key = this.getCachedComponentKey({ name, version });
        // @ts-ignore
        return this.cache.has(key) ? this.cache.get(key) : null;
    }

    microConfigKey = () => 'micro-config';

    setInitMicroConfig = (config: any) => {
      const key = this.microConfigKey();
      return this.cache.set(key, config);
    }

    getInitMicroConfig = () => {
      const key = this.microConfigKey();
      return this.cache.has(key) ? this.cache.get(key) : null;
    }
}

export default new Cache();