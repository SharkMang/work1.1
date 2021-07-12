class Footer {
  constructor(footer, initEE) {
    this.footer = footer;

    this.initEE = initEE;

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

    this.liAll.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'all')});
    this.liActive.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'active')});
    this.liComplited.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'complited')});
    this.buttonDel.addEventListener('click', () => {this.initEE.emit('delAllChoosed', )});

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

    this.initEE.subscribe('chooseFilter', (id) => {this.renderClassSelected(id)});

    this.init(index, index);
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
      const elemChoosed = document.getElementById(choosedFilter);
      const elemPrevChoosed = document.getElementById(this.prevChoosedFilter)
      elemPrevChoosed.classList.remove('selected');
      elemChoosed.classList.add('selected');
      this.prevChoosedFilter = choosedFilter;
    }

    return this.prevChoosedFilter;
  }
}