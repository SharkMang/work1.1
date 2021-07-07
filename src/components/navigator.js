class Navigator {
    constructor(container, clickOnElem) {
        this.container = container;

        this.clickOnLi = clickOnElem;

        this.ul = document.createElement('ul');
        this.ul.classList.add('ulNavSection');
    }

    render(index) {
        this.ul.innerHTML = '';

        this.beforId = index;
    
        for(let i = 1; i <= index; i++) {
            const li = document.createElement('li');
    
            li.id = i;
            li.classList.add('liNavSection');
            li.addEventListener('click', this.clickOnLi);
            li.innerHTML = `${i} page.`;

            this.ul.appendChild(li);
        }
        
        if(this.ul.lastChild) {
            this.ul.lastChild.classList.add('selected');
        }
        
        this.container.appendChild(this.ul);
    }

    removeClassSelected = (index) => {
        this.ul.childNodes[index-1].classList.remove('selected');
    }
}