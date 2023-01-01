
function addTask(){
    console.log(document.getElementById('task_due_date').value)
    let taskform = document.getElementById("task_form")
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            showTasks()
        }
    }
    xhttp.open("POST","http://localhost:4500/addTask",true)
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(`{"name":"${document.getElementById('task_name').value}","description":"${document.getElementById('task_description').value}","due_date":"${document.getElementById('task_due_date').value}"}`)
}


function startEditingTask(id){
    let task = document.getElementById(id)
    let xhttp =  new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.response)
            console.log(data)
            task.innerHTML = `
    
            <label class="task_label" for="task_name">Name:</label>
            <input class="task_input" type="text" name="name" id="${data._id}_task_name" value="${data.name}">
            <label class="task_label" for="task_description">Description:</label>
            <textarea class="task_description" name="description" id="${data._id}_task_description" cols="15" rows="10">${data.description}</textarea>
            
            <div class="details">
                <div class="date_container">
                    <label for="task_due_date">Due date:</label>
                    <input type="datetime-local" id="${data._id}_task_due_date" name="date" value="${data.due_date.toString().slice(0,data.due_date.toString().length-1)}">
                </div>
                <button class="btn" onclick="editTask('${data._id}')">Edit</button>
                <button class="btn" onclick="lTask('${data._id}')">Cancel</button>
            <div>
        
            `
        }
    }

    xhttp.open("GET",`http://localhost:4500/task/${id}`,true)
    xhttp.send()

}

function editTask(id){
    let task = document.getElementById(id)
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.response)

            task.innerHTML = `
    
            <h3 class="name">${data.name}</h3>
            <p class="description">${data.description}</p>
            <div class="task_bottom">
                <div class="time">
                    <p class="due_date">${data.due_date}</p>
                    <p class="time_left">15 mins left</p>
                </div>
                <div class="actions">
                    <button class="btn" onclick="startEditingTask('${data._id}')">Edit</button>
                    <button class="btn" >Delete</button>
                    <button class="btn" >Complete</button>
                </div>
            </div>
    
            `
        }

    }

    xhttp.open("POST",`http://localhost:4500/editTask/${id}`,true)
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(`{"name":"${document.getElementById(`${id}_task_name`).value}","description":"${document.getElementById(`${id}_task_description`).value}","due_date":"${document.getElementById(`${id}_task_due_date`).value}"}`)

}

function showTasks(){
    console.log("Welcome to TODO")
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        let html = ""
        if(this.readyState == 4 && this.status == 200){
            JSON.parse(this.response).forEach(task => {
                html+= `
                
                <div class="task" id="${task._id}">
                    <h3 class="name">${task.name}</h3>
                    <p class="description">${task.description}</p>
                    <div class="task_bottom">
                        <div class="time">
                            <p class="due_date">${task.due_date}</p>
                            <p class="time_left">15 mins left</p>
                        </div>
                        <div class="actions">
                            <button class="btn" onclick="startEditingTask('${task._id}')">Edit</button>
                            <button class="btn" >Delete</button>
                            <button class="btn" >Complete</button>
                        </div>
                    </div>
                </div>

                `
            })
            document.querySelector(".task_container").innerHTML = html
        }

    }

    xhttp.open("GET","http://localhost:4500/allTasks",true)
    xhttp.send()
}


showTasks()