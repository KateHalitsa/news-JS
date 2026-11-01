import AppLoader from './appLoader';
import type { ResponseCallback } from './loader';

class AppController extends AppLoader {
    public getSources<T>(callback: ResponseCallback<T>): void {
        super.getResp<T>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: ResponseCallback<T>): void {
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target = e.target;
        

        while (target instanceof Element && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
            const selectedSource = target;

            const sourcesContainer = selectedSource.parentElement;

            if (sourcesContainer) {
                sourcesContainer.prepend(selectedSource);
            }
            if (
                    sourceId !== null &&
                    newsContainer.getAttribute('data-source') !== sourceId
                ) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<T>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;