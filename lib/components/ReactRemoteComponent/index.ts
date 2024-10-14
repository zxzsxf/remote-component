import React from "react";
import getSourceUrl from '../../requests/getSourceUrl'
import cache from "../../requests/cache";
import jsonpLoader from "../../jsonp-loader";

import { RemoteComponentProps, ComponentConfig } from './interface'

const BUCKET_ADDRESS = 'http://localhost:3007'

class ReactRemoteComponent<T> extends React.Component<RemoteComponentProps<T>> {
    constructor(props:RemoteComponentProps<T>) {
        super(props);
        this.state = {
            Component: null,
            ComponentVersion: null,
            ComponentSourceUrl: null,
            loading: true,
            error: null,
            // 是否开启本地调试
            isLocal: false, 
        }
    }
    setLoading(state: boolean) {
        this.setState({
            loading: state
        })
    }
    setComponent(module: any) {
        this.setState({
            Component: module ? module?.default : null
        })
    }
    setError(err: any) {
        this.setState({
            error: err
        })
    }
    componentDidMount(): void {
        this.loadComponent();
    }
    getComponentSourceUrl = async (componentConfig: ComponentConfig) => {
        let sourceUrl = cache.getComponentSourceUrl(componentConfig);
        if(sourceUrl) {
            return sourceUrl;
        }
        return await getSourceUrl(componentConfig);
    }

    loadComponent = async () => {
        const { name, version } = this.props;
        try {
            const sourceUrl = await this.getComponentSourceUrl({
                name,
                version
            })
            const module = await jsonpLoader({
                url: sourceUrl,
                version,
                componentName: name,
            })
            if(module) {
                this.setLoading(false);
                this.setComponent(module);
            } else {
                // 重试
            }
        } catch (err) {
            this.setLoading(false);
            this.setComponent(null);
            this.setError(err);
        }
    }
}

export default ReactRemoteComponent;