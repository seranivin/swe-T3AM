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


var createNewTaskElement2=function(taskString, dateString2, timeString){

    var listItem2=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox2=document.createElement("input");//checkbx
	//label
	var label2=document.createElement("label");//label
	var dates2 = document.createElement("h5");// date label
	var times2 = document.createElement("h6"); //time label
	//input (text)
	var editInput2=document.createElement("input");//text
	//button.edit
	var editButton2=document.createElement("button");//edit button

	//button.delete
	var deleteButton2=document.createElement("button");//delete button

	label2.innerText=taskString;
	dates2.innerText = dateString2 + "\n" + timeString; //display date and time

	//Each elements, needs appending
	checkBox2.type="checkbox";
	editInput2.type="text";

	editButton2.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton2.className="edit1";
	deleteButton2.innerText="Delete";
	deleteButton2.className="delete1";



	//and appending.
	listItem2.appendChild(checkBox2);
	listItem2.appendChild(label2);
	listItem2.appendChild(dates2);
	listItem2.appendChild(times2);
	listItem2.appendChild(editInput2);
	listItem2.appendChild(editButton2);
	listItem2.appendChild(deleteButton2);
	return listItem2;
}

var completed; //variable to see if a task is already completed or past due

var addTask2=function(){
	console.log("Add Task...");
	var date2 = document.getElementById("datepicker2");
	var time2 = document.getElementById("time2");
	console.log(time2.value);
	var countDownDate2 = new Date(date2.value + " " + time2.value).getTime(); //expiration date

	//Create a new list item with the text from the #new-task:
	var listItem2=createNewTaskElement2(taskInput2.value, date2.value, time2.value);

	//Append listItem2 to incompleteTaskHolder2
	incompleteTaskHolder2.appendChild(listItem2);
	bindTaskEvents2(listItem2, taskCompleted2);
	//empty input boxes
	date2.value = "";
	time2.value = "";
	taskInput2.value="";
	var myfunc2 = setInterval(function() {
		console.log(countDownDate2);
		var now2 = new Date().getTime();
		var timeleft2 = countDownDate2 - now2;   
		// Display the message when countdown is over
		if (timeleft2 < 0) {
			console.log("COMPLETED");
			var test2 = listItem2.querySelector('input[type=checkbox]');
			completed = true; 
			test2.checked = true;
			completedTasksHolder2.appendChild(listItem2);
			clearInterval(myfunc2);
		}
	}, 1000);
}

//Edit an existing task.

var editTask2=function(){
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
var deleteTask2=function(){
		console.log("Delete Task...");

		var listItem2=this.parentNode;
		var ul2=listItem2.parentNode;
		//Remove the parent list item from the ul.
		ul2.removeChild(listItem2);

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
		if (completed == true){
			alert("The deadline for that event has passed. It cannot be moved to the incomplete list");
		}
		else{
			var listItem2=this.parentNode;
			incompleteTaskHolder2.appendChild(listItem2);
			bindTaskEvents2(listItem2,taskCompleted2);
		}
}



var ajaxRequest2=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton2.addEventListener("click",addTask2);
addButton2.addEventListener("click",ajaxRequest2);


var bindTaskEvents2=function(tasklistItem2,checkBoxEventHandler2){
	console.log("bind list item events");
//select listItem2s children
	var checkBox2=tasklistItem2.querySelector("input[type=checkbox]");
	var editButton2=tasklistItem2.querySelector("button.edit1");
	var deleteButton2=tasklistItem2.querySelector("button.delete1");


			//Bind editTask to edit button.
			editButton2.onclick=editTask2;
			//Bind deleteTask to delete button.
			deleteButton2.onclick=deleteTask2;
			//Bind taskCompleted2 to checkBoxEventHandler.
			checkBox2.onchange=checkBoxEventHandler2;
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