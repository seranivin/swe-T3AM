//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.
var username = JSON.parse(window.localStorage.getItem("vUserLocalStorage"));  
var taskInput3=document.getElementById("new-task2");//Add a new task.
var addButton3=document.getElementsByTagName("button")[10];//first button
var incompleteTaskHolder3=document.getElementById("incomplete-task1");//ul of #incomplete-tasks
var completedTasksHolder3=document.getElementById("completed-task1");//completed-tasks

window.addEventListener('load', function() {
	//add previous firebase tasks from user
	firebase.database().ref().child("login/"+username+'/school').once("value", function(snapshot) {
		var tasks3 = snapshot.val();
		var keys3 = Object.keys(tasks3);
		//console.log('VALS: '+Object.valueOf(tasks));
		for (var i=0; i<keys3.length;i++) {
			var oldDate3 = snapshot.child(keys3[i]+"/date").val();
			var oldDes3 = snapshot.child(keys3[i]+"/description").val();
			var oldTime3 = snapshot.child(keys3[i]+"/time").val();
			//var oldComp = snapshot.child(keys[i]+"/completed").val();
			var listItem3 = createOldTaskElement3(oldDes3, oldDate3, oldTime3);
            var countDownDate = new Date(oldDate3 + " " + oldTime3).getTime(); //expiration date
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            if (timeleft < 0) {
                console.log('Firebase: Old task completed.');
                completedTasksHolder3.appendChild(listItem3);
                bindTaskEvents3(listItem3, taskCompleted3);
                var test = listItem3.querySelector('input[type=checkbox]');
			     test.checked = true;
            }else{
                //Append listItem to incompleteTaskHolder
               incompleteTaskHolder3.appendChild(listItem3);
               bindTaskEvents3(listItem3, taskIncomplete3);
                console.log('Firebase: Old task incomplete.');
            }
		}
		});
});


//create previous user tasks
var createOldTaskElement3=function(taskString, dateString, timeString){

    var listItem3=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox3=document.createElement("input");//checkbx
	//label
	var label3=document.createElement("label");//label
	var dates3 = document.createElement("h5");// date label
	var randNum3 = document.createElement("h6");// time label
	//input (text)
	var editInput3=document.createElement("input");//text
	//button.edit
	var editButton3=document.createElement("button");//edit button

	//button.delete
	var deleteButton3=document.createElement("button");//delete button
	//label texts
	label3.innerText=taskString;
	dates3.innerText = dateString + "\n" + timeString;
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
	listItem3.appendChild(dates3);
	listItem3.appendChild(editInput3);
	listItem3.appendChild(editButton3);
	listItem3.appendChild(deleteButton3);
    listItem3.appendChild(randNum3);
	return listItem3;
}

var createNewTaskElement3=function(taskString, dateString3, timeString){

    var listItem3=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox3=document.createElement("input");//checkbx
	//label
	var label3=document.createElement("label");//label
    var dates3 = document.createElement("h5");// date label
    var randNum3 = document.createElement("h6");// random id label
	//input (text)
	var editInput3=document.createElement("input");//text
	//button.edit
	var editButton3=document.createElement("button");//edit button

	//button.delete
	var deleteButton3=document.createElement("button");//delete button

	label3.innerText=taskString;
	dates3.innerText = dateString3 + "\n" + timeString; //display date and time

	//Each elements, needs appending
	checkBox3.type="checkbox";
	editInput3.type="text";

	editButton3.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton3.className="edit2";
	deleteButton3.innerText="Delete";
	deleteButton3.className="delete2";
	randNum3.innerText = Math.floor(Math.random() * 100001);


	//and appending.
	listItem3.appendChild(checkBox3);
	listItem3.appendChild(label3);
    listItem3.appendChild(dates3);
	listItem3.appendChild(editInput3);
	listItem3.appendChild(editButton3);
	listItem3.appendChild(deleteButton3);
	listItem3.appendChild(randNum3);
	return listItem3;
}

var completed = false; //variable to see if a task is already completed or past due

var addTask3=function(){
	console.log("Add Task...");
	var date3 = document.getElementById("datepicker3");
	var time3 = document.getElementById("time3");
	console.log(time3.value);
	var countDownDate3 = new Date(date3.value + " " + time3.value).getTime(); //expiration date

	//Create a new list item with the text from the #new-task:
	var listItem3=createNewTaskElement3(taskInput3.value, date3.value, time3.value);
	//firebase id rand num
	var firebaseId3 =listItem3.querySelector('h6');	
	console.log('Firebase Work Id: '+firebaseId3.innerText);
	//Append listItem3 to incompleteTaskHolder3
	incompleteTaskHolder3.appendChild(listItem3);
	bindTaskEvents3(listItem3, taskCompleted3);

	//add information to firebase
	firebase.database().ref('login/'+username+'/school/'+firebaseId3.innerText).set({
        description: taskInput3.value,
        date: date3.value,
        time: time3.value,
        completed: completed
    }).then(function() {
        console.log("Firebase: Saved school task info.");
    }).catch(function(error) {
        console.error("Firebase: Error adding school task info: ", error);
    });

	//empty input boxes
	date3.value = "";
	time3.value = "";
	taskInput3.value="";
	var myfunc3 = setInterval(function() {
		//console.log(countDownDate3);
		var now3 = new Date().getTime();
		var timeleft3 = countDownDate3 - now3;   
		// Display the message when countdown is over
		if (timeleft3 < 0) {
			console.log("COMPLETED");
			var test3 = listItem3.querySelector('input[type=checkbox]');
            test3.checked = true;
            completed = true;
			completedTasksHolder3.appendChild(listItem3);
			clearInterval(myfunc3);
		}
	}, 1000);
}

//Edit an existing task.

var editTask3=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem3=this.parentNode;

var editInput=listItem3.querySelector('input[type=text]');
var label=listItem3.querySelector("label");
var containsClass=listItem3.classList.contains("editMode");
//firebase rand id
var firebaseId3 =listItem3.querySelector('h6');
console.log('FIRE: '+firebaseId3.innerText)
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

	//update firebase
	firebase.database().ref('login/'+username+'/school/'+firebaseId3.innerText).update({ description: editInput.value });
	console.log("Firebase: Edited school task info.");
}




//Delete task.
var deleteTask3=function(){
		console.log("Delete Task...");

		var listItem3=this.parentNode;
		var ul3=listItem3.parentNode;
		var firebaseId3 =listItem3.querySelector('h6');
		//Remove the parent list item from the ul.
		ul3.removeChild(listItem3);
		
		//remove from firebase
		firebase.database().ref('login/'+username+'/school/'+firebaseId3.innerText).remove();
		console.log('Firebase: Task school removed');
}


//Mark task completed
var taskCompleted3=function(){
		console.log("Complete Task...");
	
		//Append the task list item to the #completed-tasks
		var listItem3=this.parentNode;
		var firebaseId3 =listItem3.querySelector('h6');
		completedTasksHolder3.appendChild(listItem3);
		bindTaskEvents3(listItem3, taskIncomplete3);

		//update firebase to completed
		firebase.database().ref('login/'+username+'/school/'+firebaseId3.innerText).update({completed: 'true'}
		).then(function() {
			console.log("Firebase: Task school completed.");
		}).catch(function(error) {
			console.error("Firebase: Error completing school task: ", error);
		});

}


var taskIncomplete3=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		if (completed == true){
			alert("The deadline for that event has passed. It cannot be moved to the incomplete list");
		}
		else{
			var listItem3=this.parentNode;
			var firebaseId3 =listItem3.querySelector('h6');
			incompleteTaskHolder3.appendChild(listItem3);
			bindTaskEvents3(listItem3,taskCompleted3);

			//update firebase to incomplete
			firebase.database().ref('login/'+username+'/school/'+firebaseId3.innerText).update({completed: 'false'}
			).then(function() {
				console.log("Firebase: Task school incomplete.");
			}).catch(function(error) {
				console.error("Firebase: Error incompleting school task: ", error);
			});
		}
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