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

        this.ul.classList.add('ulFooter');
        this.liAll.classList.add('liFooter');
        this.liActive.classList.add('liFooter');
        this.liComplited.classList.add('liFooter');
        this.buttonDel.classList.add('buttonDelFooter');

        this.ul.appendChild(this.liAll);
        this.ul.appendChild(this.liActive);
        this.ul.appendChild(this.liComplited);
    }

    render(todos) {
        this.footer.appendChild(this.span);
        this.footer.appendChild(this.ul);
        this.changeCount(todos);
    }

    changeCount = (todos) => {
        let count = todos.length;

        for(let i = 0; i < todos.length; i++) {
            if(todos[i].isChecked) {
                count--;
            }
        }

        if(count !== todos.length){
            this.footer.appendChild(this.buttonDel);
        } else {
            this.buttonDel.remove();
        }

        this.span.innerHTML = `${count} items left.`;
    }
}