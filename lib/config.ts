interface MicroConfig {
    apiUrl: string;
    projectName: string;
}

declare global {
    interface Window {
        __MICRO_COMPONENT_CONFIG__: MicroConfig;
    }
}

const defaultConfig: MicroConfig = {
    apiUrl: 'http://localhost:4000/components/find',
    projectName: ''
};

// 初始化 window 上的配置
if (typeof window !== 'undefined' && !window.__MICRO_COMPONENT_CONFIG__) {
    window.__MICRO_COMPONENT_CONFIG__ = { ...defaultConfig };
}

export const initMicro = (apiUrl: string, projectName: string) => {
    if (typeof window === 'undefined') {
        throw new Error('initMicro 只能在浏览器环境中使用');
    }

    if (!apiUrl || typeof apiUrl !== 'string') {
        throw new Error('接口地址不合法，请输入有效的URL地址');
    }
    
    try {
        new URL(apiUrl);
    } catch (e) {
        throw new Error('接口地址格式不正确，请输入有效的URL地址');
    }

    if (!projectName || typeof projectName !== 'string') {
        throw new Error('工程名不合法，请输入有效的工程名称');
    }

    window.__MICRO_COMPONENT_CONFIG__ = {
        apiUrl,
        projectName
    };
};

export const getConfig = () => {
    if (typeof window === 'undefined') {
        return { ...defaultConfig };
    }
    return { ...window.__MICRO_COMPONENT_CONFIG__ };
};

// 为了向后兼容，保留默认导出
const config = {
    get apiUrl() {
        return getConfig().apiUrl;
    },
    get projectName() {
        return getConfig().projectName;
    }
};

export default config; 