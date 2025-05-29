import React from "react";
import getSourceUrl from '../../requests/getSourceUrl'
import cache from "../../requests/cache";
import jsonpLoader from "../../jsonp-loader";
import { RemoteComponentProps, ComponentConfig } from './interface'
// const BUCKET_ADDRESS = 'http://localhost:3007'

class ReactRemoteComponent<T> extends React.Component<RemoteComponentProps<T>, any> {
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
        if(!this.props.name || !this.props.version) {
            return;
        }
        this.loadComponent();
    }
    getComponentSourceUrl = async (componentConfig: ComponentConfig) => {
        let sourceUrl = cache.getComponentSourceUrl(componentConfig);
        console.log( '从cache获取sourceUrl', sourceUrl, componentConfig);
        if(sourceUrl) {
            return sourceUrl;
        }
        return await getSourceUrl(componentConfig);
    }
    renderRemoteComponent = () => {
        const { Component } = this.state;
        const { componentProps } = this.props;
        return (
            Component ? 
                <Component {...componentProps}></Component>
            : null
        )
    } 

    loadComponent = async () => {
        const { name, version } = this.props;
        try {
            const {sourceUrl} = await this.getComponentSourceUrl({
                name,
                version
            })
            console.log(sourceUrl,'sourceUrl==');
            const module = await jsonpLoader({
                url: sourceUrl,
                version,
                componentName: name,
            })
            if(module) {
                console.log(module, 'module');
                this.setLoading(false);
                this.setComponent(module);
            } else {
                // 重试
                this.setLoading(false);
                this.setComponent(null);
            }
        } catch (err) {
            this.setLoading(false);
            this.setComponent(null);
            this.setError(err);
        }
    }
    
    render() {
        // const { render } = this.props;
        // const { Component } = this.state;
        // if(render) {
        //     return render(Component);
        // }
        return (
            <div className="remote-component-container">
                {this.renderRemoteComponent()}
            </div>
        )
    }
}


export default ReactRemoteComponent;