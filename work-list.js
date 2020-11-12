//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.

var taskInput2=document.getElementById("new-task1");//Add a new task.
var addButton2=document.getElementsByTagName("button")[5];//first button
var incompleteTaskHolder2=document.getElementById("incomplete-task");//ul of #incomplete-tasks
var completedTasksHolder2=document.getElementById("completed-task");//completed-tasks


var createNewTaskElement=function(taskString){

    var listItem2=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton2=document.createElement("button");//edit button

	//button.delete
	var deleteButton2=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton2.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton2.className="edit";
	deleteButton2.innerText="Delete";
	deleteButton2.className="delete";



	//and appending.
	listItem2.appendChild(checkBox);
	listItem2.appendChild(label);
	listItem2.appendChild(editInput);
	listItem2.appendChild(editButton2);
	listItem2.appendChild(deleteButton2);
	return listItem2;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem2=createNewTaskElement(taskInput2.value);

	//Append listItem2 to incompleteTaskHolder2
	incompleteTaskHolder2.appendChild(listItem2);
	bindTaskEvents2(listItem2, taskCompleted2);

	taskInput2.value="";

}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem2=this.parentNode;

var editInput=listItem2.querySelector('input[type=text]');
var label=listItem2.querySelector("label");
var containsClass=listItem2.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem2.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem2=this.parentNode;
		var ul=listItem2.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem2);

}


//Mark task completed
var taskCompleted2=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem2=this.parentNode;
	completedTasksHolder2.appendChild(listItem2);
				bindTaskEvents2(listItem2, taskIncomplete2);

}


var taskIncomplete2=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem2=this.parentNode;
	incompleteTaskHolder2.appendChild(listItem2);
			bindTaskEvents2(listItem2,taskCompleted2);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton2.onclick=addTask;
addButton2.addEventListener("click",addTask);
addButton2.addEventListener("click",ajaxRequest);


var bindTaskEvents2=function(tasklistItem2,checkBoxEventHandler){
	console.log("bind list item events");
//select listItem2s children
	var checkBox=tasklistItem2.querySelector("input[type=checkbox]");
	var editButton2=tasklistItem2.querySelector("button.edit");
	var deleteButton2=tasklistItem2.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton2.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton2.onclick=deleteTask;
			//Bind taskCompleted2 to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder2 ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder2.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents2(incompleteTaskHolder2.children[i],taskCompleted2);
	}




//cycle over completedTasksHolder2 ul list items
	for (var i=0; i<completedTasksHolder2.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents2(completedTasksHolder2.children[i],taskIncomplete2);
	}