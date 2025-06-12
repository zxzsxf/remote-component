declare global {
    interface Window {
        microConfig: any;
    }
}
export { initMicro } from './config';
export { default as ReactRemoteComponent } from './components/ReactRemoteComponent'
// export { default as VueRemoteComponent } from './components/VueRemoteComponent'
// export { initProject } from ''