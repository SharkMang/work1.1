class TodoList {
    constructor(container, handleChackbox, handleDbclickButton, handleDelButton) {
        this.container = container;

        
        this.handleChackbox = handleChackbox;
        this.handleDbclickButton = handleDbclickButton;
        this.handleDelButton = handleDelButton;

        this.ul = document.createElement('ul');
	    this.ul.classList.add('ulStyle');

        this.index = 0;
    }

    render(elemList) {
        this.ul.innerHTML = '';

    
        for(let i = 0; i < elemList.length; i++) {
            this.addOneElem(elemList[i]);
            // let li = document.createElement('li');
            // li.classList.add("listItem");
            // let div = document.createElement('div');
            // div.setAttribute('data-index', i);
            
            // div.classList.add('box');

            // let checkBox = document.createElement('input');
            // checkBox.type = 'checkbox';
            // checkBox.checked = this.elemList[i].isChecked;
            // checkBox.addEventListener('change', this.handleChackbox);
            
            // let label = document.createElement('label');
            // if(this.elemList[i].isChecked) {
            //     label.classList.add('label-item-marced');
            // } else {
            //     label.classList.add('label-item-notmarced');
            // }
            // label.innerHTML = this.elemList[i].todoName;
            // label.classList.add('label-item');
            // label.addEventListener('dblclick', this.handleDbclickButton);

            // let buttonDel = document.createElement('button');
            // buttonDel.innerHTML = 'X';
            // buttonDel.className = 'buttonDel';
            // buttonDel.addEventListener('click', this.handleDelButton);

            // div.appendChild(checkBox);
            // div.appendChild(label);
            // div.appendChild(buttonDel);
            // li.appendChild(div);

            // this.ul.appendChild(li);
        }
        this.container.appendChild(this.ul);
    }

    addOneElem(elem) {
        let li = document.createElement('li');
        li.classList.add("listItem");
        let div = document.createElement('div');
        div.setAttribute('data-index', this.index);
        this.index++;
        
        div.classList.add('box');

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = elem.isChecked;
        checkBox.addEventListener('change', this.handleChackbox);
            
        let label = document.createElement('label');
        if(elem.isChecked) {
            label.classList.add('label-item-marced');
        } else {
            label.classList.add('label-item-notmarced');
        }
        label.innerHTML = elem.todoName;
        label.classList.add('label-item');
        label.addEventListener('dblclick', this.handleDbclickButton);

        let buttonDel = document.createElement('button');
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