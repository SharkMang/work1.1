class HeaderInput {
    constructor(header, handleCheckbox, handleAddTodo) {
        this.header = header;

        this.checkBoxAll = document.createElement('input');
	    this.checkBoxAll.type = 'checkbox';
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
        this.header.appendChild(this.checkBoxAll);
        this.header.appendChild(this.input);
    }
}