export type Chain = {
    domain: string;
    ping: number;
};

export type ProxyRequest = {
    length: number;
    currentIndex: number;
    chain: Chain[];
    targetUrl?: string;
    method?: string;
};