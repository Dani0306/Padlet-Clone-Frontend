import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';


export default function openModal(component, Children){
    const Modal = lazy(() => import(`../functionality/${component}`))
    const modalDiv = document.createElement('div');
    modalDiv.id = 'modal'
    document.body.appendChild(modalDiv);

    const root = createRoot(modalDiv);

    root.render(
        <Suspense fallback={<div>Loading ...</div>}>
            <Modal root={root}>
                <Children />
            </Modal>
        </Suspense>
    )

}