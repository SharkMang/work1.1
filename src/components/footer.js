class Footer {
  constructor(footer, handlerClickAll,handlerClickActive, handlerClickComplited, handlerClearButton) {
    this.footer = footer;

    this.handlerClickAll = handlerClickAll;
    this.handlerClickActive = handlerClickActive;
    this.handlerClickComplited = handlerClickComplited;
    this.handlerClearButton = handlerClearButton;

    this.span = document.createElement('span');
    this.ul = document.createElement('ul');
    this.liAll = document.createElement('li');
    this.liActive = document.createElement('li');
    this.liComplited = document.createElement('li');
    this.buttonDel = document.createElement('button');

    this.liAll.innerHTML = 'All';
    this.liActive.innerHTML = 'Active';
    this.liComplited.innerHTML = 'Complited';

    this.buttonDel.innerHTML = 'Clear complited';

    this.liAll.addEventListener('click', this.handlerClickAll);
    this.liActive.addEventListener('click', this.handlerClickActive);
    this.liComplited.addEventListener('click', this.handlerClickComplited);
    this.buttonDel.addEventListener('click', this.handlerClearButton);

    this.liAll.id = 'all';
    this.liActive.id = 'active';
    this.liComplited.id = 'complited';

    this.ul.classList.add('ulFooter');
    this.liAll.classList.add('liFooter');
    this.liActive.classList.add('liFooter');
    this.liComplited.classList.add('liFooter');
    this.buttonDel.classList.add('buttonDelFooter');

    this.ul.appendChild(this.liAll);
    this.ul.appendChild(this.liActive);
    this.ul.appendChild(this.liComplited);

    this.prevChoosedFilter = 'all';
  }

  render(index) {
    this.liAll.classList.add('selected');
    this.footer.appendChild(this.span);
    this.footer.appendChild(this.ul);

    this.init(index, index);
  }

  removeClassSelected = (id) => {
    const elem = document.getElementById(id)
    elem.classList.remove('selected');
  }

  init(todosCounter, todosLength) {
    this.span.innerHTML = `${todosCounter} items left.`;

    if (todosCounter < todosLength){
      this.footer.appendChild(this.buttonDel);
    } else {
      this.buttonDel.remove();
    }
  }


  renderClassSelected = (choosedFilter) => {
    if (choosedFilter !== this.prevChoosedFilter) {
      const elem = document.getElementById(choosedFilter);
      this.removeClassSelected(this.prevChoosedFilter);
      elem.classList.add('selected');
      this.prevChoosedFilter = choosedFilter;
    }

    return this.prevChoosedFilter;
  }
}