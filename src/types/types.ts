export type ProxyRequest = {
    length: string;
    currentStep: string;
    nextProxy?: string;
    targetUrl?: string;
    method?: string;
};