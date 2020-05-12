import ProductsBase from './goods';

export default class List {
  constructor() {
    this.productsBase = new ProductsBase();
    if (typeof document !== 'undefined') {
      this.table = document.getElementById('crm');
    }
  }

  init() {
    if (typeof document !== 'undefined') {
      const add = document.getElementById('add');
      add.addEventListener('click', () => {
        this.popup();
      });
      this.drawTable();
    }
  }

  drawTable() {
    if (typeof document !== 'undefined') {
      this.table.innerHTML = '';
      this.productsBase.products.forEach((item) => {
        const row = `<tr>
        <td class="name">${item.name}</td>
        <td class="price">${item.price}</td>
        <td><span class="edit">&#9999;</span><span class="del">X</span></td>
      </tr>`;
        this.table.insertAdjacentHTML('beforeend', row);
      });

      const edits = Array.from(document.getElementsByClassName('edit'));
      edits.forEach((item) => {
        item.addEventListener('click', () => {
          const parent = item.parentNode.parentNode;
          const nameField = parent.querySelector('td.name');
          const priceField = parent.querySelector('td.price');
          this.popup(nameField.textContent, priceField.textContent);
        });
      });

      const dels = Array.from(document.getElementsByClassName('del'));
      dels.forEach((item) => {
        item.addEventListener('click', () => {
          const parent = item.parentNode.parentNode;
          const nameField = parent.querySelector('td.name');
          const priceField = parent.querySelector('td.price');
          this.productsBase.del({
            name: nameField.textContent,
            price: Number(priceField.textContent),
          });
          this.drawTable();
        });
      });
    }
  }

  popup(name, price) {
    if (typeof document !== 'undefined') {
      let popup = `<div id="popup">
        <form id="popupForm">
          <label for="productName">Название</label>
          <input type="text" id="productName" name="productName" required>
          <label for="productPrice">Стоимость</label>
          <input id="productPrice" name="productPrice" type="number" min="1" required>
          <div class="buttons">
            <button class="save">Сохранить</button>
            <button class="cancel">Отмена</button>
          </div>
        </form
      </div>`;
      const elem = document.createElement('div');
      elem.insertAdjacentHTML('beforeend', popup);
      popup = elem.firstChild;
      document.getElementsByTagName('body')[0].appendChild(popup);

      popup = document.getElementById('popup');
      popup.style.top = `${(window.innerHeight - popup.offsetHeight)
      / 2}px`;
      popup.style.left = `${(window.innerWidth - popup.offsetWidth)
      / 2}px`;

      const cancel = document.querySelector('button.cancel');
      const nameInput = document.getElementById('productName');
      const priceInput = document.getElementById('productPrice');
      if (name !== undefined) nameInput.value = name;
      if (price !== undefined) priceInput.value = price;

      const close = () => popup.parentNode.removeChild(popup);
      const form = document.getElementById('popupForm');
      form.addEventListener('submit', () => {
        if (!form.checkValidity()) {
          form.reportValidity();
        } else {
          this.productsBase.add({
            name: nameInput.value,
            price: priceInput.value,
          });
          close();
          this.drawTable();
        }
      });

      cancel.addEventListener('click', (e) => {
        e.preventDefault();
        close();
      });
    }
  }
}
