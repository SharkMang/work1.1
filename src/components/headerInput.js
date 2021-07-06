class Header {
    constructor(container, handleCheckbox, handleAddTodo) {
        this.container = container;

        this.checkBoxAll = document.createElement('input');
	    this.checkBoxAll.type = 'checkbox';
        this.checkBoxAll.classList.add('headerChackBox');
        this.checkBoxAll.addEventListener('change', handleCheckbox);

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.className = 'headerInput';
        this.input.placeholder = 'What needs to be done?';
        this.input.addEventListener('keydown', handleAddTodo);
        this.input.addEventListener("blur", (event) => {
            event.target.value = '';
            event.target.placeholder = 'What needs to be done?';
        });
    }

    render() {
        this.container.appendChild(this.checkBoxAll);
        this.container.appendChild(this.input);
    }

    changeCheckbox(todos) {
        let count = 0;
        
        for(let todo of todos) {
            if(todo.isChecked) {
                count++;
            }
        }

        if(todos.length === count && todos.length !== 0) {
            this.checkBoxAll.checked = true;
        } else {
            this.checkBoxAll.checked = false;
        }
    }
}