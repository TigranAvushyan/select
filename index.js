

class Select {

    constructor(selector, option) {
        this.$el = document.getElementById(selector)
        this.placeholder = option.placeholder
        this.data = option.data
        this.selected = option.selected || {id: null, value: null}
        this.#render()
        this.#setup()
    }

    #getTemplate = () => {
        return `<div class="select-input" data-type="input">
                <span class="text">${this.selected.value || this.placeholder}</span>
                <i class="fa fa-chevron-down open-icon"></i>
            </div>
            <div class="background-click" data-type="input"></div>
            <div class="select-list">
                ${this.data.map(item => {
            return `<div class="select-item ${this.selected.id === item.id ? 'selected' : ''}"
                                 data-type="item" 
                                 data-item="${item.id}"
                                 data-value="${item.value}">${item.value}</div>`
                                 }).join('')}
            </div>`
    }

    #render() {
        this.$el.classList.add("select")
        this.$el.classList.add("close")
        this.$el.innerHTML = this.#getTemplate()
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener("click", this.clickHandler)
    }

    clickHandler(event){
        const {type, item, value} = event.target.dataset
        if (type === 'input') {
            this.toggle()

        }
        else if (type === 'item') {
            this.selected = {
                id: parseInt(item),
                value: value
            }
            this.#render()
            this.toggle()
        }
    }



    get isOpen(){
        return this.$el.classList.contains('open')
    }


    toggle() {
        this.isOpen ? this.close() : this.open()
    }


    open(){
        this.$el.classList.remove("close")
        this.$el.classList.add("open")
        this.$el.style.zIndex = "1000"
    }

    close(){
        this.$el.classList.add("close")
        this.$el.classList.remove("open")
        this.$el.style.zIndex = "auto"
    }

    destroy(){
        this.$el.removeEventListener('click',this.clickHandler)
        this.$el.innerHTML = ""
    }



}






const select = new Select("select", {
    placeholder: 'Frameworks',
    data: [
        {id: 1, value: 'Vue'},
        {id: 2, value: 'React'},
        {id: 3, value: 'Angular'},
        {id: 4, value: 'NodeJS'},
        {id: 5, value: 'Spring'},
        {id: 6, value: 'Django'},
        {id: 7, value: 'Flask'},
        {id: 8, value: 'Rails'},
        {id: 9, value: 'Yii'},
        {id: 10, value: 'ASP.Net'},
        {id: 11, value: 'jQuery'},
    ],
    // selected: {id: 10, value: 'ASP.Net'}
})

window.s = select