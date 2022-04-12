const form = document.querySelector('form')
const clearAll = document.querySelector('.clearAll')

//LocalStorage
const items = JSON.parse(localStorage.getItem('items')) || []

function addItems(){
    const input = form.querySelector('input.text')
    const datalist = form.querySelector('input.data-filter')
    let item = {
        value : input.value,
        status : 'pending',
        // fiiter : datalist.value,
    }
    items.push(item)
    createList('all')
    localStorage.setItem('items', JSON.stringify(items))
    this.reset();
}

function createList(filter){
    const list = document.querySelector('.list')
    let li = '';
    items.map((item, id) => {
        let isCompleted = item.status == 'completed' ? 'checked' : ''; 
        if(filter == item.status || filter == 'all'){
            li = li + `
            <li>
            <input type="checkbox" id="${id}" ${isCompleted}>
            <label for="${id}" class="${isCompleted} "onclick="checkedItem(this, ${id})">${item.value}</label>
            <button onclick="deletedItem(${id})"><i class='bx bx-x'></i></button>
            </li>
            `;
        }
    })
    list.innerHTML = li;

    const todoLength = document.querySelector('.todo-length')
    todoLength.textContent = items.length
    let Verb = items.length > 1 ? 'have' : 'has';
    document.querySelector('footer .beV').textContent = Verb;
    
}

function checkedItem(item, id){
    const checkBox = item.parentElement.firstElementChild
    if(!checkBox.checked){
        items[id].status = 'completed'
        item.classList.add('checked')
    }else{
        items[id].status = 'pending'
        item.classList.remove('checked')
    }
    localStorage.setItem('items', JSON.stringify(items))
}
function deletedItem(index){
    items.splice(index, 1)
    createList('all')
    localStorage.setItem('items', JSON.stringify(items))
}

function clearAllItems(){
    items.splice(0, items.length)
    localStorage.setItem('items', JSON.stringify(items))
    createList('all')
}
const todoFilters = document.querySelectorAll('.todo-filter >li')
todoFilters.forEach(li => {
    // console.log(li);
    li.addEventListener('click', () =>{
        document.querySelector('.todo-filter >li.active').classList.remove('active')
        li.classList.add('active')
        createList(li.id)
    })
})
createList('all')
form.addEventListener('submit', addItems)
clearAll.addEventListener('click', clearAllItems)
