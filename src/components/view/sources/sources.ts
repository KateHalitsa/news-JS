import { Source } from '../../../types/typesView';
import './sources.css';

class Sources {
    draw(data:Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true)as DocumentFragment;

            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            if (item.id !== null) {
            sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
