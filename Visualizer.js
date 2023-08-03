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
function drawTree() {
    // Retrieve the number of nodes on the left side starting from the root
    let noOfLeftNodes = 0;
    let currNode = root;
    let counter = 0;
    while (currNode !== null) {
        counter++;
        currNode = currNode.leftChild;
    }
    let nodeX = parseInt(NODE_RADIUS * Math.sqrt(2), 10);
    let halfWidth = 0.0;
    let currLineWidthDifference = INITIAL_ROOT_CHILD_LINE_WIDTH;
    for (let i = 1; i <= counter; i++) {
        halfWidth += nodeX + currLineWidthDifference;
        currLineWidthDifference *= NEXT_LINE_PROPORTION;
    }
    // Now we have obtained the width from the leftmost node
    // Proceed with drawing the tree
    const canvas = document.getElementById("TreePane");
    const ctx = canvas.getContext("2d");
    setCanvas(ctx, halfWidth);
}
function setCanvas(ctx, root, x, y = 50) {
    if (root !== null) {
        let leftChild = root.leftChild;
        let rightChild = root.rightChild;
        let dx = 100;
        let dy = 50;

        drawCircle(ctx, x, y, NODE_RADIUS, "orange", "black", 1, "" + root.value);

        if (leftChild !== null) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - dx, y + dy);
            ctx.stroke();
            setCanvas(ctx, leftChild, x - dx, y + dy);
        }
        if (rightChild !== null) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();
            setCanvas(ctx, rightChild, x + dx, y + dy);
        }
    }
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
    let length = Math.floor(Math.random() % 8) + 8;
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
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
    // Fill text
    ctx.beginPath();
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(nodeValue, x, y);
    ctx.fill();
}
  // Use the onload event handler to generate and visualize the binary tree
  window.onload = () => {
    generateTree();
    setCanvas(ctx, root, halfWidth); // Directly use the global root variable
}