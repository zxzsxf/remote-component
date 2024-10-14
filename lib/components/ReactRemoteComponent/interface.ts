import React from "react";
interface RenderComponent {
    loading: boolean;
    error: any;
    Component: React.ComponentType | null;
}

export interface RemoteComponentProps<T> {
    /**
    * 远程组件名
    */
    name: string;
    /**
    * 组件版本
    */
    version?: string;
    /**
    * 自定义渲染逻辑
    */
    render?: (props: RenderComponent) => React.ReactElement;
    /**
    * 渲染完成回调
    */
    onComponentRendered?: () => void;
    /**
    * 渲染失败回调
    */  
    onComponentRenderFailed?: () => void;

}

export interface ComponentConfig {
    /**
    * 远程组件名
    */
    name: string;
    /**
    * 组件版本
    */
    version?: string;
}