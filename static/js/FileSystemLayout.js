'use strict'; // to avoid JavaScript weirdness

// responsible for managing the #dnd div which is basically the drop box zone
// should contain some sort of data structure which allows it to keep a track
// of how the file system actually looks like, x and y axis value to place a 
// file, should be the main communicator with the user, and should have a 
// composition relationship with FileIcon and FolderIcon classes
class FileSystemLayout {

	constructor() {
		// should have x and y coordinates
		this.x = 15;
		this.y = 7;
		this.contents = []; // contains a collection of conents being added to the window can be a fileIcon or FolderIcon
		this.globalClick = false; // this keeps track of whether the drop zone click should make all the files blue or not, if it is true then
								  // then the counter will be incremented
		this.counter = 0;		 // only if the counter is greater than 0 the click event handler will loop through everything and unselect and selected file
							     // and turn the color of the file from red to blue
	}

	create() {
		this.attachGlobalClickEH();
	}

	// adds a file icon to the DOM
	addFile(filename) {
		var file = new FileIcon(filename, this.x, this.y);
		file.create(); // create the file icon components
		this.contents.push(file); // push the fileIcon to the content array
		this.attachFileIconEH(file); // attach the event handler of the file
	}

	// attaches file event handler
	// the idea is to loop over the contents array and turn on the the file icon provided
	// and turn off the file icon not provided
	attachFileIconEH(fileIcon) {
		var self = this; // this in each scope is different in JavaScript

		// on click the color of the highlight changes
		$("#" + fileIcon.id).on("click", function () {		
			// each file icon has an event handler which loops through the all the file icons
			// then checks if the click is on the current fileIcon and if the fileIcon is not
			// selected then go ahead and select it
			// else unselect all other fileIcons by making them blue and unselecting it
			// each iteration will either be the fileIcon clicked or all other fileIcons
			for (var i = 0; i < self.contents.length; ++i) {
				// both these expression need to be true in order for the entire entire statement to be true
				// which makes sense as we want the current element in the array to be the fileIcon we clicked
				// AND we have to make sure that the element in the array is not selected, because if it is not selected
				// only then can we select it, we can't select something that is unselected
				if (self.contents[i] === fileIcon && !self.contents[i].selected) {
					// red - select
					$("#" + self.contents[i].id).css("background-image", "url(static/imgs/file-4.png)");
					self.contents[i].selected = true;
					self.globalClick = true; // turns on the drop zone event handlers job to do its thing
					self.counter = 0; // prevents an activated global click from deactivating current marked red window
									 // while switching between two tiles (this is mandatory as the global event is fired immediently after a click
									 // it happens simultaneously! )
				} else {
					// blue - unselect
					$("#" + self.contents[i].id).css("background-image", "url(static/imgs/file-3.png)");
					self.contents[i].selected = false; // turns the boolean false indicating it has been unselected
				}
			}
		});
	}


	// attaches a click event handler to the drop zone window, where upon clicking
	// the dropzone if any item gets selected, it automatically gets deselected
	attachGlobalClickEH() {
		var self = this;
		// target the drop zone for clicks only
		$("#dnd").on("click", function() {
			if (self.counter > 0) { // first check, makes sure that the self counter is active, if it is not then we go on to the second check
				for (var i = 0; i < self.contents.length; ++i) {
					$("#" + self.contents[i].id).css("background-image", "url(static/imgs/file-3.png");
					// also needs to turn off the selected boolean which is indicating that it is currently turned on
					self.contents[i].selected = false; // unselects by turning the select boolean of each icon false
				}
				self.counter = 0;
				self.globalClick = false;
			} 		
			else if (self.globalClick) { // this check, checks only if first check is not fulfilled, if globalClick gets turned on
				++self.counter; // then we simply increment the counter so that if another drop zone click is made we can loop through the
								// entire contents and unselect them!
			} 
		});

	}

}