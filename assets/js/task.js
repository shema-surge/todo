async function addTask(){

    let headers={"Content-Type":"application/json"}
    let data = `{
        
    "name":"${document.getElementById('task_name').value}",
    "description":"${document.getElementById('task_description').value}",
    "due_date":"${document.getElementById('task_due_date').value}"

    }`

    await ajax("POST","http://localhost:4500/addTask",headers,data)
    showTasks()

}

async function editMode(id){

    document.getElementById(`${id}_task`).hidden = true;
    let task = await ajax("GET",`http://localhost:4500/task/${id}`,null,null)
    document.getElementById(id).innerHTML+=displayTaskForm(task)

}

async function edit(id){
    let headers={"Content-Type":"application/json"}
    let data = `{
        
    "name":"${document.getElementById(`${id}_task_name`).value}",
    "description":"${document.getElementById(`${id}_task_description`).value}",
    "due_date":"${document.getElementById(`${id}_task_due_date`).value}"

    }`

    let updatedTask = await ajax("POST",`http://localhost:4500/editTask/${id}`,headers,data)
    if(updatedTask) document.getElementById(id).innerHTML = displayTask(updatedTask)
}

async function complete(id){
    let task = await ajax("POST",`http://localhost:4500/editTask/${id}`,{"Content-Type":"application/json"},'{"status":"Completed"}')
    document.getElementById(id).innerHTML=displayTask(task)
}

async function deleteTask(id){

    await ajax("GET",`http://localhost:4500/delete/${id}`,null,null)
    document.getElementById(id).remove()

}

function cancelEdit(id){
    document.getElementById(`${id}_task`).hidden = false;
    document.getElementById(`${id}_task_form`).remove();
}



function displayTask(task){
    return `
    
    <div id="${task._id}_task">
    <h3 class="name">${task.name}</h3>
    <p class="description">${task.description}</p>
    <div class="task_bottom">
        <div class="time">
            <p class="due_date">${(new Date(task.due_date.toString())).toUTCString()}</p>
            <p class="time_left">15 mins left</p>
        </div>
        <div class="actions">
            <button class="btn" onclick="editMode('${task._id}')">Edit</button>
            <button class="btn" onclick="deleteTask('${task._id}')">Delete</button>
            ${task.status==="Pending"?`<button class="btn" onclick="complete('${task._id}')">Complete</button>`:"<p>Completed</p>"}
        </div>
    </div>
    </div>
    
    `
}

function displayTaskForm(task){
    return `
    
    <div class="task_form" id="${task._id}_task_form">
    <label class="task_label" for="task_name">Name:</label>
    <input class="task_input" type="text" name="name" id="${task._id}_task_name" value="${task.name}">
    <label class="task_label" for="task_description">Description:</label>
    <textarea class="task_description" name="description" id="${task._id}_task_description" cols="15" rows="10">${task.description}</textarea>

    <div class="details">
        <div class="date_container">
            <label for="task_due_date">Due date:</label>
            <input type="datetime-local" id="${task._id}_task_due_date" name="date" value="${task.due_date.toString().slice(0,task.due_date.toString().length-1)}">
        </div>
        <button class="btn" onclick="edit('${task._id}')">Edit</button>
        <button class="btn" onclick="cancelEdit('${task._id}')">Cancel</button>
    </div>
    </div>
    
    `
}



function showTasks(){
    ajax("GET","http://localhost:4500/allTasks",null,null).then(data => {
        let html=""
        data.forEach(task => {
            html+= `
            
            <div class="task" id="${task._id}">
            ${displayTask(task)}
            </div>
    
            `
        })
        document.querySelector(".task_container").innerHTML = html
    })
}


function ajax(action,uri,headers,data){

    let response
    let xhttp = new XMLHttpRequest()

    return new Promise((resolve,reject)=>{
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.response) response=resolve(JSON.parse(this.response))
                else resolve(null)
            }
        }
        
        xhttp.open(action,uri,true)
        if(headers){
            for(let key in headers){
                xhttp.setRequestHeader(key,headers[key])
            }
        }
        xhttp.send(data)
    })
}

showTasks()