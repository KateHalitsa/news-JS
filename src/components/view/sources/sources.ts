import { Source } from '../../../types/typesView';
import './sources.css';

class Sources {
   public draw(data: Source[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (!sourceItemTemp) {
        throw new Error('Source template was not found');
    }

    data.forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
        const sourceElement = sourceClone.querySelector<HTMLElement>('.source__item');

        if (!sourceElement) {
            throw new Error('Source item was not found');
        }

        sourceClone.querySelector('.source__item-name')!.textContent = item.name;

        if (item.id !== null) {
            sourceElement.setAttribute('data-source-id', item.id);
        }

        fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
