class Navigator {
    constructor(container, clickOnElem) {
        this.container = container;

        this.clickOnLi = clickOnElem;

        this.ul = document.createElement('ul');
        this.ul.classList.add('ulNavSection');
    }

    render(index) {
        // if(index !== 1) {
            this.ul.innerHTML = '';
        
            for(let i = 1; i < index + 1; i++) {
                let li = document.createElement('li');
    
                li.id = i;
                li.classList.add('liNavSection');
                li.addEventListener('click', this.clickOnLi);
                li.innerHTML = `${i} page.`;
    
                this.ul.appendChild(li);
            }
    
            this.container.appendChild(this.ul);
        //}
    }
}