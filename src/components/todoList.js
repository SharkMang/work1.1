class TodoList {
    constructor(container, handleChackbox, handleDbclickButton, handleDelButton) {
        this.container = container;

        this.handleChackbox = handleChackbox;
        this.handleDbclickButton = handleDbclickButton;
        this.handleDelButton = handleDelButton;

        this.ul = document.createElement('ul');
	    this.ul.classList.add('ulSection');
    }

    render(elemList) {
        this.ul.innerHTML = '';

        for(let i = 0; i < elemList.length; i++) {
            this.addOneElem(elemList[i]);
        }

        this.container.appendChild(this.ul);
    }

    addOneElem = (elem) => {
        const li = document.createElement('li');
        li.classList.add("listItem");
        const div = document.createElement('div');
        div.id = elem.id;
        
        div.classList.add('box');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add('liCheckbox');
        checkBox.checked = elem.isChecked;
        checkBox.addEventListener('change', this.handleChackbox);
            
        const label = document.createElement('label');
        if(elem.isChecked) {
            label.classList.add('label-item-marced');
        } else {
            label.classList.add('label-item-notmarced');
        }
        label.innerHTML = elem.todoName;
        label.classList.add('label-item');
        label.addEventListener('dblclick', this.handleDbclickButton);

        const buttonDel = document.createElement('button');
        buttonDel.innerHTML = 'X';
        buttonDel.className = 'buttonDel';
        buttonDel.addEventListener('click', this.handleDelButton);

        div.appendChild(checkBox);
        div.appendChild(label);
        div.appendChild(buttonDel);
        li.appendChild(div);

        this.ul.appendChild(li);
    }
}