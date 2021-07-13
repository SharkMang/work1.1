export default class Navigator {
  constructor(container, initEE) {
    this.container = container;

    this.initEE = initEE;

    this.ul = document.createElement('ul');
    this.ul.classList.add('ulNavSection');

    this.prevChoosedNav = 0;
    this.countOfPages = 0;
  }

  render(totalPages) {
    this.ul.innerHTML = '';

    for(let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');

      li.id = i;
      li.classList.add('liNavSection');
      li.addEventListener('click', (event) => {this.initEE.emit('clickOnNavEl', parseInt(event.target.id))});
      li.innerHTML = `${i} page.`;

      this.ul.appendChild(li);
    }

    if (totalPages > 1) {
      this.container.appendChild(this.ul);
      this.ul.lastChild.classList.add('selected');
    } else {
      this.ul.remove();
    }

    this.prevChoosedNav = totalPages;
  }

  renderClassSelected = (idElem) => {
    if (idElem !== this.prevChoosedNav) {
      let elem = document.getElementById(idElem);

      elem.classList.add('selected');
      this.ul.childNodes[this.prevChoosedNav-1].classList.remove('selected');
      this.prevChoosedNav = idElem;
    }
  }

  init(currentPage, totalPages) {
    if (this.countOfPages !== totalPages) {
      this.render(totalPages);
    }

    if (currentPage !== this.prevChoosedNav) {
      this.renderClassSelected(currentPage);
    }
  }
}