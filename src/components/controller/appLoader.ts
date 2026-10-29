import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const baseLink = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!baseLink || !apiKey) {
            throw new Error('API_URL and API_KEY must be defined in the .env file');
        }

        super(baseLink, {
            apiKey,
        });
    }
}

export default AppLoader;