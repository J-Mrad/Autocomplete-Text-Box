//Control
var suggestions1=['Hello','World','Hello World','This is a hello test','ok','a','b','01 10'];
suggestions1 = parseSuggestionsList(suggestions1);
autocomplete(document.getElementById('myTestInput1'),suggestions1);
document.getElementById("suggestions_display1").innerHTML="["+suggestions1.toString()+"]";

//Empty array
var suggestions2=[];
suggestions2 = parseSuggestionsList(suggestions2);
autocomplete(document.getElementById('myTestInput2'),suggestions2);
document.getElementById("suggestions_display2").innerHTML="["+suggestions2.toString()+"]";

//Empty strings
var suggestions3=["",'',null, undefined];
suggestions3 = parseSuggestionsList(suggestions3);
autocomplete(document.getElementById('myTestInput3'),suggestions3);
document.getElementById("suggestions_display3").innerHTML="["+suggestions3.toString()+"]";

//Repeated Values
var suggestions4=["Hello","Hello","Hello","Hello"];
suggestions4 = parseSuggestionsList(suggestions4);
autocomplete(document.getElementById('myTestInput4'),suggestions4);
document.getElementById("suggestions_display4").innerHTML="["+suggestions4.toString()+"]";

//Sub-Arrays
var suggestions5=["main","also main",["sub array","also a sub",["double-sub"]]];
suggestions5 = parseSuggestionsList(suggestions5);
autocomplete(document.getElementById('myTestInput5'),suggestions5);
document.getElementById("suggestions_display5").innerHTML="["+suggestions5.toString()+"]";

//Integers
var suggestions6=[1,2,3,4,-5];
suggestions6 = parseSuggestionsList(suggestions6);
autocomplete(document.getElementById('myTestInput6'),suggestions6);
document.getElementById("suggestions_display6").innerHTML="["+suggestions6.toString()+"]";

//Floats
var suggestions7=[138448.13451,31844.1414,-18419.11314];
suggestions7 = parseSuggestionsList(suggestions7);
autocomplete(document.getElementById('myTestInput7'),suggestions7);
document.getElementById("suggestions_display7").innerHTML="["+suggestions7.toString()+"]";

//null List
var suggestions8=null;
suggestions8 = parseSuggestionsList(suggestions8);
autocomplete(document.getElementById('myTestInput8'),suggestions8);
document.getElementById("suggestions_display8").innerHTML="["+suggestions8.toString()+"]";

//undefined List
var suggestions9=undefined;
suggestions9 = parseSuggestionsList(suggestions9);
autocomplete(document.getElementById('myTestInput9'),suggestions9);
document.getElementById("suggestions_display9").innerHTML="["+suggestions9.toString()+"]";




function autocomplete(input,arr){var currentFocus;input.addEventListener("input",function(e){var list_holder,list_item,i,input_text=this.value;closeAllLists();if(!input_text)return!1;currentFocus=-1;list_holder=document.createElement("DIV");list_holder.setAttribute("id",this.id+"autocomplete-list");list_holder.setAttribute("class","autocomplete-items List");this.parentNode.appendChild(list_holder);for(i=0;i<arr.length;i++){if(!arr[i]||typeof arr[i]==="undefined")continue;for(j=0;j<=arr[i].length-input_text.length;j++){if(arr[i].substr(j,input_text.length).toUpperCase()==input_text.toUpperCase()){list_item=document.createElement("DIV");list_item.innerHTML=arr[i].substr(0,j);list_item.innerHTML+="<strong>"+arr[i].substr(j,input_text.length)+"</strong>";list_item.innerHTML+=arr[i].substr(j+input_text.length);list_item.innerHTML+="<input type='hidden' value='"+arr[i]+"'>";list_item.addEventListener("click",function(e){input.value=this.getElementsByTagName("input")[0].value;closeAllLists()});list_holder.appendChild(list_item);break}}}});input.addEventListener("keydown",function(e){var mylist=document.getElementById(this.id+"autocomplete-list");if(mylist)mylist=mylist.getElementsByTagName("div");if(e.keyCode==40){currentFocus++;addActive(mylist)}
else if(e.keyCode==38){currentFocus--;addActive(mylist)}
else if(e.keyCode==13){e.preventDefault();if(currentFocus>-1){if(mylist)mylist[currentFocus].click()}}
else if(e.keyCode==27){closeAllLists()}});function addActive(mylist){if(!mylist)return!1;removeActive(mylist);if(currentFocus>=mylist.length)currentFocus=0;if(currentFocus<0)currentFocus=(mylist.length-1);mylist[currentFocus].classList.add("autocomplete-active")}
function removeActive(mylist){for(var i=0;i<mylist.length;i++){mylist[i].classList.remove("autocomplete-active")}}
function closeAllLists(elmnt){var x=document.getElementsByClassName("autocomplete-items");for(var i=0;i<x.length;i++)
if(elmnt!=x[i]&&elmnt!=input)
x[i].parentNode.removeChild(x[i]);}
document.addEventListener("click",function(e){closeAllLists(e.target)})}
function parseSuggestionsList(suggestions){if(!suggestions||typeof suggestions===undefined)return[];var newlist=[],i=0;while(suggestions.length!=0){element=suggestions.pop();if(Array.isArray(element)){element_values=parseSuggestionsList(element);for(j=0;j<element_values.length;j++){newlist[i]=element_values[j];i++}}
else{newlist[i]=element+"";i++}}
return newlist}