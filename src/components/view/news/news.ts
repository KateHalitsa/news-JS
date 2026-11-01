import { Article } from '../../../types/typesView';
import './news.css';

class News {
    draw(data:Article[]) {
    const title = document.querySelector<HTMLElement>('.news-title');
    const newsContainer = document.querySelector<HTMLElement>('.news');
    if (!title || !newsContainer) return;

    const news = data.slice(0, 10);
    const fragment = document.createDocumentFragment();

    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (!newsItemTemp) {
        throw new Error('News template was not found');
    }
    if (news.length === 0) {
        const message= document.createElement("div");
        message.classList.add("message");
        message.textContent='No news';
            newsContainer.replaceChildren(title,message);
            return;
        }
    title.textContent = news[0].source.name;
     

    news.forEach((item, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

        if (idx % 2) {
            newsClone.querySelector('.news__item')!.classList.add('alt');
        }

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');

            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description;
            newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        
    newsContainer.replaceChildren(title, fragment);
        
    }
}

export default News;
