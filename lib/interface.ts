export interface GetSourceUrlParams {
    name?: string;
    version?: string;
}

export interface GetSourceUrlPromise {
    (params: GetSourceUrlParams) : Promise<any>
}