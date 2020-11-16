//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
//Event handling, uder interaction is what starts the code execution.

var username = JSON.parse(window.localStorage.getItem("vUserLocalStorage"));  
var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

var home_load = function(){
    //console.log('LOADED: '+ loaded);
        console.log('running');
        //add previous firebase tasks from user
        firebase.database().ref().child("login/"+username+'/home').on("value", function(snapshot) {
        var tasks = snapshot.val();
        var keys = Object.keys(tasks);
        //console.log('VALS: '+Object.valueOf(tasks));
        for (var i=0; i<keys.length;i++) {
            var oldDate = snapshot.child(keys[i]+"/date").val();
            var oldDes = snapshot.child(keys[i]+"/description").val();
            var oldTime = snapshot.child(keys[i]+"/time").val();
            //var oldComp = snapshot.child(keys[i]+"/completed").val();
            var listItem = createOldTaskElement(oldDes, oldDate, oldTime);
            var countDownDate = new Date(oldDate + " " + oldTime).getTime(); //expiration date
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            if (timeleft < 0) {
                console.log('Firebase: Old task completed.');
                completedTasksHolder.appendChild(listItem);
                bindTaskEvents(listItem, taskCompleted);
                var test = listItem.querySelector('input[type=checkbox]');
			     test.checked = true;
            }else{
                //Append listItem to incompleteTaskHolder
               incompleteTaskHolder.appendChild(listItem);
               bindTaskEvents(listItem, taskIncomplete);
                console.log('Firebase: Old task incomplete.');
            }

        }
        });
};


var createOldTaskElement=function(taskString, dateString, timeString){

    var listItem=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	var dates = document.createElement("h5");// date label
	var randNum = document.createElement("h6");// time label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button
	//label texts
	label.innerText=taskString;
	dates.innerText = dateString + "\n" + timeString;
	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(dates);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
    listItem.appendChild(randNum);
	return listItem;
}

//New task list item
var createNewTaskElement=function(taskString, dateString, timeString){

    var listItem=document.createElement("li");
    console.log("adding item");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	var dates = document.createElement("h5");// date label
	var randNum = document.createElement("h6");// random id label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button
	//label texts
	label.innerText=taskString;
	dates.innerText = dateString + "\n" + timeString;
	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";
    randNum.innerText = Math.floor(Math.random() * 100001);

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(dates);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
    listItem.appendChild(randNum);
	return listItem;
}

//time remaining
var completed = false;

var addTask=function(){
	console.log("Add Task...");
	var date = document.getElementById("datepicker");
	var time = document.getElementById("time");
	console.log(time.value);
	var countDownDate = new Date(date.value + " " + time.value).getTime(); //expiration date

	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value, date.value, time.value);
	console.log(countDownDate);
	console.log(listItem);
    //firebase id rand num
    var firebaseId =listItem.querySelector('h6');  
    console.log('Firebase Home Id: '+firebaseId.innerText);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	
    //add information to firebase
    firebase.database().ref('login/'+username+'/home/'+firebaseId.innerText).set({
        description: taskInput.value,
        date: date.value,
        time: time.value,
        completed: completed
    }).then(function() {
        console.log("Firebase: Saved home task info.");
    }).catch(function(error) {
        console.error("Firebase: Error adding home task info: ", error);
    });
    
    //empty input boxes
	date.value = "";
	time.value = "";
	taskInput.value="";
	var myfunc = setInterval(function() {
		//console.log(countDownDate);
		var now = new Date().getTime();
		var timeleft = countDownDate - now;   
		// Display the message when countdown is over
		if (timeleft < 0) {
			console.log("COMPLETED");
			completed = true;
			var test = listItem.querySelector('input[type=checkbox]');
			test.checked = true;
			completedTasksHolder.appendChild(listItem);
			clearInterval(myfunc);
		}
	}, 1000);
    
}


//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");
var time = document.getElementById("time");

var listItem=this.parentNode;
var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
//firebae rand id
var firebaseId =listItem.querySelector('h6');
console.log('FIRE: '+firebaseId.innerText)
		//If class of the parent is .editmode
		if(containsClass){
		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
    
    //update firebase
    firebase.database().ref('login/'+username+'/home/'+firebaseId.innerText).update({ description: editInput.value });
    console.log("Firebase: Edited home task info.");

}


//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");
        var time = document.getElementById("time");
		var listItem=this.parentNode;
		var ul=listItem.parentNode;
        console.log(ul);
        var firebaseId =listItem.querySelector('h6');
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);
        //console.log(listItem.nodeValue);

        //remove from firebase
        firebase.database().ref('login/'+username+'/home/'+firebaseId.innerText).remove();
        console.log('Firebae: Task home removed');

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
	var time = document.getElementById("time");
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
    var firebaseId =listItem.querySelector('h6');
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

    //update firebase to completed
    firebase.database().ref('login/'+username+'/home/'+firebaseId.innerText).update({completed: 'true'}
    ).then(function() {
        console.log("Firebase: Task home completed.");
    }).catch(function(error) {
        console.error("Firebase: Error completing home task: ", error);
    });

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
		//Mark task as incomplete.
		//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		if (completed == true){
			alert("The deadline for that event has passed. It cannot be moved to the incomplete list");
		}
		else{
			var listItem=this.parentNode;
            var firebaseId =listItem.querySelector('h6');
			incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
            
            console.log(firebaseId.innerText);
            //update firebase to incomplete
            firebase.database().ref('login/'+username+'/home/'+firebaseId.innerText).update({completed: 'false'}
            ).then(function() {
                console.log("Firebase: Task home incomplete.");
            }).catch(function(error) {
                console.error("Firebase: Error incompleting home task: ", error);
            });
		}
		
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(tasklistItem,checkBoxEventHandler){
	console.log("bind list item events");
//select listItems children
	var checkBox=tasklistItem.querySelector("input[type=checkbox]");
	var editButton=tasklistItem.querySelector("button.edit");
	var deleteButton=tasklistItem.querySelector("button.delete");

			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}