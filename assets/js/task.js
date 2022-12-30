

function editTask(id){

    let task = document.querySelector(`#${id}`)

    task.innerHTML = `
    
    <label class="task_label" for="task_name">Task name:</label>
    <input class="task_input" type="text" name="username" id="username">
    <label class="task_label" for="description">Description:</label>
    <textarea class="task_description" name="description" id="description" cols="15" rows="10"></textarea>
    
    <div class="details">
        <div class="date_container">
            <label for="due_date">Due date:</label>
            <input type="datetime-local" id="due_date" name="date">
        </div>
        <button class="btn" onclick="loadTask('${id}')">Edit</button>
    <div>

    `
}

function loadTask(id){

    let task = document.querySelector(`#${id}`)

    task.innerHTML = `

    <h3 class="name">Task5</h3>
    <p class="description">Get stuff done!!</p>
    <div class="task_bottom">
        <div class="time">
            <p class="due_date">12-oct-2022</p>
            <p class="time_left">15 mins left</p>
        </div>
        <div class="actions">
            <button class="btn" onclick="editTask('${id}')">Edit</button>
            <button class="btn" >Delete</button>
            <button class="btn" >Complete</button>
        </div>
    </div>

    `
}

function fetchData(){
    //XMLHttpRequest req = new XMLHttpRequest()
}