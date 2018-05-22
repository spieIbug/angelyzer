export const elementNotInRightPlace = (data: string, prop: string) => (`The element ${data} is not allowed in ${prop}`);
export const elementsNotInRightPlace = (datas: string[]) => {
    let html = '';
    for (const data of datas) {
        html += `<p>${data}</p>`;
    }
    return html;
};
