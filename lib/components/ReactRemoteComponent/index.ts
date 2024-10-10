import React from "react";
import { RemoteComponentProps } from './interface'

class ReactRemoteComponent<T> extends React.Component<RemoteComponentProps<T>> {
    constructor(props:RemoteComponentProps<T>) {
        super(props);
        this.state = {
            Component: null,
            ComponentVersion: null,
            ComponentSourceUrl: null,
            loading: true,
            error: null,
        }
    }
    componentDidMount(): void {
        this.loadComponent();
    }
    getComponentSourceUrl = ({ name, version}) => {
        
    }

    loadComponent = async () => {
        const { name, version } = this.props;
        try {
            const { sourceUrl } = await this.getComponentSourceUrl({
                name,
                version
            })
        } catch (err) {
            
        }
    }
}

export default ReactRemoteComponent;