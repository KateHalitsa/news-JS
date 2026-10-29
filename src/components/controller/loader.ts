enum HttpMethod {
    GET = 'GET',
}
export type ResponseCallback<T> = (data: T) => void;

interface RequestOptions {
endpoint: string;
options?: Record<string, string>;
}
class Loader {
    public baseLink: string;
    public options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

   public getResp<T>(
    { endpoint, options = {} }: RequestOptions,
    callback: ResponseCallback<T> = () => {
        console.error('No callback for GET response');
    }
): void {
    this.load<T>( HttpMethod.GET, endpoint, callback, options);
}
    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
    method: HttpMethod,
    endpoint: string,
    callback: ResponseCallback<T>,
    options: Record<string, string> = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
        .then((res) => this.errorHandler(res))
        .then((res) => res.json() as Promise<T>)
        .then((data) => callback(data))
        .catch((err: unknown) => console.error(err));
}
}

export default Loader;
