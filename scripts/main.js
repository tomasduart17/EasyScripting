//Items HTML
const item1 = {
    "name": "GetPlayerPed()"
}


// Funções Drag and Drop

var itemOn = ""
var itemOnActive = null
var items = []

var activeSpacer = false // Styling
var activeDrop = "containerDrop"// Function

// Items Function

function allowDrop(ev) {
    if(!activeSpacer){
        SetBackground("#containerDrop","rgba(0, 0, 0, 0.2)")
    }

    ev.preventDefault();
}

function leaveDrop(ev) {
    if(!activeSpacer){
        SetBackground("#containerDrop","white")
    }
    ev.preventDefault();
}
  
function drag(ev) {
    itemOn = $(ev.target).text();
}
  
function drop(ev) {
    if(ev.currentTarget.id === activeDrop){

        ev.preventDefault();
        if(itemOnActive == null){
            items.push(itemOn)
        }
        SetBackground("#containerDrop","white")
        UpdateContainer()
    }

}


//Items Ative

function dragActiveItem(ev) {
    itemOnActive = $(ev.target ).data("pos");
}

function endDropActiveItem(ev) {
    itemOnActive = null
    ev.preventDefault();
}

// Spacer Function
function dropSpacer(ev) {
    if(ev.currentTarget.id === activeDrop){
        ev.preventDefault();
        var pos = $(ev.target ).data("pos");
        if(itemOnActive != null){
            arraymove(items, itemOnActive, pos )
            itemOnActive = null
        }else{
            items.push(itemOn)
            arraymove(items, items.length-1,pos  )
        }
        activeSpacer = false
        SetBackground(ev.target,"aqua")
        UpdateContainer()
    }

}

function allowDropSpacer(ev) {
    SetBackground("#containerDrop","white")
    SetBackground(ev.target,"rgba(0, 0, 0, 0.2)")
    activeDrop="spacerDrop"
    activeSpacer = true
    ev.preventDefault();
}

function leaveDropSpacer(ev) {
    SetBackground("#containerDrop","white")
    SetBackground(ev.target,"aqua")
    activeDrop="containerDrop"
    activeSpacer = false
    ev.preventDefault();
}




//Container Function 

function UpdateContainer(){
    var selector = $("#containerDrop")
    $(selector ).empty();
    items.forEach((e,pos)=>{
        $(selector).append(` 
            <div class="item" data-item="${item1}" data-pos="${pos}" draggable="true" ondragstart="dragActiveItem(event)" ondragend="endDropActiveItem(event)" >
                <p>${e}</p>
            </div>
            <div data-pos="${pos}" class="spacer" id="spacerDrop" ondrop="dropSpacer(event)" ondragover="allowDropSpacer(event)" ondragleave="leaveDropSpacer(event)">&nbsp;</div>
        `);

    })
}



// Styling Function 

function SetBackground(selector,color){
    $(selector).css("background-color", color);
}


// Utils Function

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}