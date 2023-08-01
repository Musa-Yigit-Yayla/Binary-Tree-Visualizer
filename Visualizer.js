/**
 * @author Yiğit
 * This class will be used to draw binary trees
 */
const MAX_LENGTH = 15; //max possible node count
const NODE_RADIUS = 20;
const NEXT_LINE_PROPORTION = 0.5; //proportion of the last line's x coordinate from the child to the parent node
const INITIAL_ROOT_CHILD_LINE_WIDTH = 200;
const INITIAL_ROOT_CHILD_LINE_HEIGHT = parseInt(INITIAL_ROOT_CHILD_LINE_WIDTH * (1080.0 / 1920.0), 10);

const LEFT_INSET = 50; //50 pixels is the left side inset
const TOP_INSET = 100; //inset for canvas
let arr = null;

/*document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
    createBinaryTree();
    drawTree();
}*/
function drawTree(root){
    //retrieve the number of nodes on the left side starting from the root
    let noOfLeftNodes = 0;
    let currNode = root;
    let counter = 0;
    while(currNode !== null){
        counter++;
        currNode = currNode.leftChild;
    }
    let nodeX = parseInt(NODE_RADIUS * Math.sqrt(2), 10);
    let halfWidth = NODE_RADIUS * Math.pow(NEXT_LINE_PROPORTION, counter);
    let currLineWidthDifference = INITIAL_ROOT_CHILD_LINE_WIDTH;
    for(let i = 1; i <= counter; i++){
        halfWidth += nodeX + currLineWidthDifference;
        currLineWidthDifference *= NEXT_LINE_PROPORTION;
    }
    //now we have obtained the width from the left most node
    //proceed with drawing the tree
    const canvas = document.getElementById("TreePane");
    const ctx = canvas.getContext("2d");
    //ctx.fillStyle("#FFA500"); // orange
    //traverse the nodes in a preorder fashion and draw the canvas
    setCanvas(ctx, root, LEFT_INSET + halfWidth);
    
}
function setCanvas(ctx, halfWidth){
    //let root = TreeUtility.root;
    let currNode = root;
    preorderDraw(currNode, LEFT_INSET + halfWidth, TOP_INSET, null, halfWidth, ctx);
}
//draw the circles into the canvas in a preorder fashion
function preorderDraw(root, x, y, parent, currLineWidthDiff, ctx ){
    if(root != null){
        //we are drawing the root node
        drawCircle(ctx, x, y, NODE_RADIUS, "orange", "black", 1, "" + root.value);
        preorderDraw(root.leftChild, x - (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), y + (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), root, currLineWidthDiff / 2, ctx);
        preorderDraw(root.rightChild, x + (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), y + (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), root, currLineWidthDiff / 2, ctx);
    }
}
//Invoke when the regenerate button is clicked
function generateTree(){
    let isBSTCalled = false;
    //set isBSTCalled with respect to event source


    arr = [];
    let length = Math.random() % 8 + 8;
    for(let i = 0; i < length; i++){
        let newNumber = getNewNumber(arr);
        arr.push(newNumber);
    }
    //start the generation of tree based on the current selection
    if(isBSTCalled){
        currSelection = BINARY_SEARCH_TREE_SELECTION;
    }
    else{
        currSelection = BINARY_TREE_SELECTION;
    }
    createBinaryTree(arr);
    drawTree();
}
function getNewNumber(... array){
    if(array.length !== MAX_LENGTH){
        let result = Math.floor(Math.random() * MAX_LENGTH) + 1;
        while(contains(result)){
            result = Math.floor(Math.random() * MAX_LENGTH) + 1;
        }
        return result;
    }
    return -1;
}
function contains(key, ... array){
    for(let i = 0; i < array.length; i++){
        if(array[i] === key){
            return true;
        }
    }
    return false;
}
//Pass the context of the canvas as the argument and the other correlated fields as you desire
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth, nodeValue) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    //if (fill) {
      ctx.fillStyle = 'orange';
      ctx.fill();
    //}
    //if (stroke) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      //fill text
      ctx.beginPath();
      ctx.lineWidth = 50;
      ctx.fillStyle = "green";
      ctx.textAlign = 'right';
      ctx.fillText(nodeValue, x, y);
      ctx.fill();
    //}
  }
  // Use the onload event handler to generate and visualize the binary tree
window.onload = () => {
    drawTree(root); // This calls the original createBinaryTree function
};