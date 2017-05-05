// pickup here where you left off!
class DropBox {
	create() {
		$("body").append("<div id = main-div> <div id = dnd ></div> </div");
		this.generateCSS();
		this.attachEventHandlers();
	}

	generateCSS() {
		var d = "#dnd";
		var id = "#main-div";
		$(id).css("position", "relative");
		$(id).css("height", "600px");
		$(id).css("width", "1000px");
		$(id).css("left", "280px");
		$(id).css("bottom", "20px");
		$(id).css("border", "1px solid white");
		$(id).css("background", "#e6f9ff");
		$(id).css("border-radius", "2%");
		$(d).css("position", "relative");
		$(d).css("height", "593px");
		$(d).css("width", "770px");
		$(d).css("border", "3px solid #262626");
		$(d).css("border-radius", "2%");
		$(d).css("background", "white");
	}

/*
	stopPropagation stops the event from bubbling up the event chain.
	preventDefault prevents the default action the browser makes on that event.

*/

/*
drag - Fired when an element or text selection is being dragged.
dragend - Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key). (See Finishing a Drag.)
dragenter - Fired when a dragged element or text selection enters a valid drop target.
dragexit - Fired when an element is no longer the drag operation's immediate selection target.
dragleave - Fired when a dragged element or text selection leaves a valid drop target.
dragover - Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
dragstart - Fired when the user starts dragging an element or text selection. (See Starting a Drag Operation.)
drop - Fired when an element or text selection is dropped on a valid drop target. (See Performing a Drop.)
*/

	attachEventHandlers() {
		var d = "#dnd";

		$(d).on("dragend", function(event) {
			// when mouse button is realeased
			event.preventDefault();
			event.stopPropagation();

			console.log("dragend - Button released");


		});

		$(d).on("dragexit", function(event) {
			// in or out of the window
			event.preventDefault();
			event.stopPropagation();

			console.log("dragexit - The element to be dropped is either in the window or not");


		});

		$(d).on("dragover", function(event) {
			// dragging motion ends
			event.preventDefault();
			event.stopPropagation();

			console.log("dragover - Dragging motion is over now");


		});

		$(d).on("dragenter", function(event) {
			// when a valid drop target is reached 
			// perfect time to make the div highlighted
			event.preventDefault();
			event.stopPropagation();


			console.log("dragenter - Target acquired!");

			$(d).css("background", "#E6D1E6");
			$(d).css("border", "3px solid white");
		});

		$(d).on("dragleave", function(event) {
			// when a valid drop target is untargeted
			// perfect time to make the div unhighlighted
			event.preventDefault();
			event.stopPropagation();


			console.log("dragleave - Out of target!");
			
			$(d).css("background", "white");
			$(d).css("border", "3px solid #262626");			


		});		

		$(d).on("drop", function(event) {
			// dropping the file
			// background color also needs to be turned to default because this is the last event
			// fired after all the events
			event.preventDefault();
			event.stopPropagation();

			console.log("drop - Event triggered!");


			$(d).css("background", "white");
			$(d).css("border", "3px solid #262626");

		});
	}


}
