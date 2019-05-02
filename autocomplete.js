var suggestions = ['Hello','World','Hello World','This is a hello test','ok','a','b','01 10'];
autocomplete(document.getElementById('myInput'), suggestions);

document.getElementById("suggestions_display").innerHTML = "[" + suggestions.toString() + "]";

function autocomplete(input, arr) { //Takes a text field element and the array of suggestions
	var currentFocus; //shows which entry is activated
	
	//creating and showing the list
	input.addEventListener("input", function(e) { //executed when a new input is detected
		var list_holder, list_item, i, input_text = this.value;
		closeAllLists(); //close any lists created before
		if (!input_text) return false;
		currentFocus = -1;

		list_holder = document.createElement("DIV");//to hold the items
		list_holder.setAttribute("id", this.id + "autocomplete-list");
		list_holder.setAttribute("class", "autocomplete-items List");
		this.parentNode.appendChild(list_holder);

		for (i = 0; i < arr.length; i++) { //per word
			if(!arr[i]||typeof arr[i]==="undefined")continue;
			for(j=0;j<=arr[i].length-input_text.length;j++){ //per set of letters of length equal to the input
				if (arr[i].substr(j, input_text.length).toUpperCase() == input_text.toUpperCase()) { //if the chosen set of letters matches the input
					
					list_item = document.createElement("DIV"); //div to hold our item
					
					list_item.innerHTML = arr[i].substr(0,j);
					list_item.innerHTML += "<strong>" + arr[i].substr(j, input_text.length) + "</strong>"; //highlight (bold) matching set of letters
					list_item.innerHTML += arr[i].substr(j+input_text.length);

					list_item.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"; //saving currently selected value as a hidden input

					list_item.addEventListener("click", function(e) { //when the list holder is clicked

						input.value = this.getElementsByTagName("input")[0].value; //move the selected text into the textbox
						closeAllLists();
					});
	
					list_holder.appendChild(list_item);
					break; //since the input was found, no need to check the rest of the word
				}
			}
	  	}
    });

	//adding keyboard controls
	input.addEventListener("keydown", function(e) {
		var mylist = document.getElementById(this.id + "autocomplete-list");
		if (mylist) mylist = mylist.getElementsByTagName("div");
		if (e.keyCode == 40) { //arrow down
			currentFocus++; //move down one element
			addActive(mylist); //makes the currently selected element active
		} 
		else if (e.keyCode == 38) { //arrow up
			currentFocus--;
			addActive(mylist);
		} 
		else if (e.keyCode == 13) { // enter key
			e.preventDefault(); //prevents any preset macros of the Enter key from executing
			if (currentFocus > -1) { 
				if (mylist) mylist[currentFocus].click();
			}
		}
		else if (e.keyCode == 27) { // escape key
			closeAllLists();
		}
	});

	function addActive(mylist) { //activate an item
		if (!mylist) return false;
		removeActive(mylist); //remove all other active tags
		if (currentFocus >= mylist.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (mylist.length - 1);
		mylist[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(mylist) { //remove all active tags from a list
		for (var i = 0; i < mylist.length; i++) {
			mylist[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) { //close all opened lists except the one received
		var x = document.getElementsByClassName("autocomplete-items");
			for (var i = 0; i < x.length; i++)
				if (elmnt != x[i] && elmnt != input)
					x[i].parentNode.removeChild(x[i]);				
	}
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
function parseSuggestionsList(suggestions){
	var newlist, i;
	while(suggestions.length != 0){
		element = suggestions.pop();
		if(Array.isArray(element)){
			element_values = parseSuggestionsList(element);
			for(j = 0 ; j < element_values.length ; j++){
				newlist[i] = element_values[j];
				i++;
			}
		}
		else{
			newlist[i] = element;
			i++;
		}
	}
	return newlist;
}