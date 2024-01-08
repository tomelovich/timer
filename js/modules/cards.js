import { getResource } from "../services/services";
function cards() {
//использование классов

    class MenuItem {
        constructor(img, altimg, title, descr, price, ...classes) {
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.img = img;
            this.altimg = altimg;
            this.classes = classes;
        }

        createElem() {
            const menuField = document.querySelector('.menu__field');
            const container = menuField.querySelector('.container');
            const menuItem = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                menuItem.classList.add(this.element);
            } else {
                this.classes.forEach(className => menuItem.classList.add(className));
            }

            menuItem.innerHTML += `
                <img src="${this.img}" alt="${this.altimg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            container.appendChild(menuItem);
        }
    }

   


    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price).createElem();
            });
        });
}

export default cards;