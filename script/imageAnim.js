(() => {
	console.log('fired');

	//set up the puzzle pieces and boards
	//
	// need a reference to each piece that we want to create
	const thePieces = ["topLeft","topRight","bottomLeft","bottomRight"];

	//get a reference to the drag side
	let piecesBoard = document.querySelector(".puzzle-pieces");
	let puzzleBoard = document.querySelector(".puzzle-board");

	// get a reference to the butons at the bottom so we can change the puzzle
	let puzzleSelectors = document.querySelectorAll("#buttonHolder img");


	//get a reference to the drop areas
	let dropzones = document.querySelectorAll('.drop-zone');

	//functions og in the middle
	

	//drag functionality
	//this is a 3-step process
	//1. handle the drag event
	//2. handle the dragover event
	//3. handle the drop event
	//
	//dragging sets some data reference(an audio track name, image source, etc)
	//dragover -> just prevent the default behavior
	// on a drop is where the magic happens -> script that behavior, get the data reference
	//do what you need to do with it
	function initDrag()
	{
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e){
				console.log('draggin...');
				e.dataTransfer.setData("text/plain", this.id);
				console.log(this.id);
			});
		});


	}

	//drop functionality
	dropzones.forEach(zone =>{
		zone.addEventListener("dragover", function(e){
			e.preventDefault();
			console.log('dragged over me!')
		});

	zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dropped something on me');

			let piece = e.dataTransfer.getData("text/plain");
			


			//bug fix for dropzones
			
			if(zone.innerHTML == ""){
				e.target.appendChild(document.querySelector(`#${piece}`));
			console.log(zone)
			}
			else
			{
				e.target.removeChild(document.querySelector(`#${piece}`));
			console.log(zone)
			}
			
			
			
		})
	});


	function createPuzzlePieces(pictureIndex)
	{
		//generate images here -> need to make 4 (top left, right, bottom left, right)
		thePieces.forEach((piece,index) =>{
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image"
			 src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable>`;

			 piecesBoard.innerHTML += newPuzzlePiece;
			 console.log(newPuzzlePiece)
		});

		// debugger;

		initDrag();

	}
	function resetPuzzlePieces()
	{
		// change the current puzzle, regenerate the pieces
		//debugger;
		//clean out the puzzle pieces div
		piecesBoard.innerHTML = "";
		createPuzzlePieces(this.dataset.puzzleref); //'this' is puzzleSelectors


		


		
		// dropzones.forEach((e) => {e.innerHTML = ""})
		//generate new piece
		

	}

	//event handling goes here
	puzzleSelectors.forEach(button => button.addEventListener("click",resetPuzzlePieces));

	// call this function to set up / generate the pieces on load
	createPuzzlePieces(0);

	debugger;
})();
