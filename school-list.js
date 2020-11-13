//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.

var taskInput3=document.getElementById("new-task2");//Add a new task.
var addButton3=document.getElementsByTagName("button")[10];//first button
var incompleteTaskHolder3=document.getElementById("incomplete-task1");//ul of #incomplete-tasks
var completedTasksHolder3=document.getElementById("completed-task1");//completed-tasks


var createNewTaskElement3=function(taskString){

    var listItem3=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox3=document.createElement("input");//checkbx
	//label
	var label3=document.createElement("label");//label
	//input (text)
	var editInput3=document.createElement("input");//text
	//button.edit
	var editButton3=document.createElement("button");//edit button

	//button.delete
	var deleteButton3=document.createElement("button");//delete button

	label3.innerText=taskString;

	//Each elements, needs appending
	checkBox3.type="checkbox";
	editInput3.type="text";

	editButton3.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton3.className="edit2";
	deleteButton3.innerText="Delete";
	deleteButton3.className="delete2";



	//and appending.
	listItem3.appendChild(checkBox3);
	listItem3.appendChild(label3);
	listItem3.appendChild(editInput3);
	listItem3.appendChild(editButton3);
	listItem3.appendChild(deleteButton3);
	return listItem3;
}



var addTask3=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem3=createNewTaskElement3(taskInput3.value);

	//Append listItem3 to incompleteTaskHolder3
	incompleteTaskHolder3.appendChild(listItem3);
    bindTaskEvents3(listItem3, taskCompleted3);
    //empty input boxes
    date.value = "";
    taskInput.value=""
}

//Edit an existing task.

var editTask3=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem3=this.parentNode;

var editInput=listItem3.querySelector('input[type=text]');
var label=listItem3.querySelector("label");
var containsClass=listItem3.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem3.classList.toggle("editMode");
}




//Delete task.
var deleteTask3=function(){
		console.log("Delete Task...");

		var listItem3=this.parentNode;
		var ul3=listItem3.parentNode;
		//Remove the parent list item from the ul.
		ul3.removeChild(listItem3);

}


//Mark task completed
var taskCompleted3=function(){
		console.log("Complete Task...");
	
		//Append the task list item to the #completed-tasks
		var listItem3=this.parentNode;
		completedTasksHolder3.appendChild(listItem3);
		bindTaskEvents3(listItem3, taskIncomplete3);

}


var taskIncomplete3=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem3=this.parentNode;
		incompleteTaskHolder3.appendChild(listItem3);
		bindTaskEvents3(listItem3,taskCompleted3);
}



var ajaxRequest3=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton3.addEventListener("click",addTask3);
addButton3.addEventListener("click",ajaxRequest3);


var bindTaskEvents3=function(tasklistItem3,checkBoxEventHandler3){
	console.log("bind list item events");
//select listItem3s children
	var checkBox3=tasklistItem3.querySelector("input[type=checkbox]");
	var editButton3=tasklistItem3.querySelector("button.edit2");
	var deleteButton3=tasklistItem3.querySelector("button.delete2");


			//Bind editTask to edit button.
			editButton3.onclick=editTask3;
			//Bind deleteTask to delete button.
			deleteButton3.onclick=deleteTask3;
			//Bind taskCompleted3 to checkBoxEventHandler.
			checkBox3.onchange=checkBoxEventHandler3;
}

//cycle over incompleteTaskHolder3 ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder3.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents3(incompleteTaskHolder3.children[i],taskCompleted3);
	}




//cycle over completedTasksHolder3 ul list items
	for (var i=0; i<completedTasksHolder3.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents3(completedTasksHolder3.children[i],taskIncomplete3);
	}