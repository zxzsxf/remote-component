import React from "react";
import { RemoteComponentProps } from './interface'

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