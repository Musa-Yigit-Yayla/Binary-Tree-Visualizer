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
    // Calculate the number of nodes on the left side starting from the root
    let noOfLeftNodes = 0;
    let currNode = root;
    while (currNode !== null) {
        noOfLeftNodes++;
        currNode = currNode.leftChild;
    }

    // Calculate the half width based on the number of nodes on the left side
    let nodeX = parseInt(NODE_RADIUS * Math.sqrt(2), 10);
    let halfWidth = 0.0;
    let currLineWidthDifference = INITIAL_ROOT_CHILD_LINE_WIDTH;
    for (let i = 1; i <= noOfLeftNodes; i++) {
        halfWidth += nodeX + currLineWidthDifference;
        currLineWidthDifference *= NEXT_LINE_PROPORTION;
    }

    // Proceed with drawing the tree
    const canvas = document.getElementById("TreePane");
    const ctx = canvas.getContext("2d");
    setCanvas(ctx, root, canvas.width / 2, TOP_INSET, 1, "root");
}




function setCanvas(ctx, currNode, x, y, level, direction) {
    if (currNode === null) {
        return;
    }

    drawCircle(ctx, x, y, NODE_RADIUS, "orange", "black", 1, "" + currNode.value);

    const nextY = y + INITIAL_ROOT_CHILD_LINE_HEIGHT;
    const childXOffset = halfWidth / Math.pow(2, level + 1);

    if (currNode.leftChild !== null) {
        const leftX = x - childXOffset;
        drawLine(ctx, x, y, leftX, nextY);
        setCanvas(ctx, currNode.leftChild, leftX, nextY, level + 1, "left");
    }

    if (currNode.rightChild !== null) {
        const rightX = x + childXOffset;
        drawLine(ctx, x, y, rightX, nextY);
        setCanvas(ctx, currNode.rightChild, rightX, nextY, level + 1, "right");
    }
}




//draw the circles into the canvas in a preorder fashion
function preorderDraw(root, x, y, currLineWidthDiff, ctx) {
    if (root != null) {
        // Draw the current node
        drawCircle(ctx, x, y, NODE_RADIUS, "orange", "black", 1, "" + root.value);

        // Draw the left child node
        if (root.leftChild !== null) {
            preorderDraw(root.leftChild, x - (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), y + INITIAL_ROOT_CHILD_LINE_HEIGHT, currLineWidthDiff / 2, ctx);
        }

        // Draw the right child node
        if (root.rightChild !== null) {
            preorderDraw(root.rightChild, x + (currLineWidthDiff / 2 + NODE_RADIUS * Math.sqrt(2)), y + INITIAL_ROOT_CHILD_LINE_HEIGHT, currLineWidthDiff / 2, ctx);
        }
    }
}
//Invoke when the regenerate button is clicked
function generateTree() {
    // Set isBSTCalled with respect to event source
    let isBSTCalled = false;

    // Clear the canvas
    const canvas = document.getElementById("TreePane");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Start the generation of the tree based on the current selection
    if (isBSTCalled) {
        currSelection = BINARY_SEARCH_TREE_SELECTION;
        createBinarySearchTree(...arr);
    } else {
        currSelection = BINARY_TREE_SELECTION;
        createBinaryTree(...arr);
    }

    // Draw the tree
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
function calculateTreeWidth(node) {
    if (node === null) {
      return 0;
    }
    const leftWidth = calculateTreeWidth(node.leftChild);
    const rightWidth = calculateTreeWidth(node.rightChild);
    return Math.max(leftWidth, rightWidth) + NODE_RADIUS * 2;
}
  
function drawSubtree(ctx, node, x, y, subtreeWidth) {
    if (node === null) {
      return;
    }
  
    const nodeX = parseInt(NODE_RADIUS * Math.sqrt(2), 10);
  
    drawCircle(ctx, x, y, NODE_RADIUS, "orange", "black", 1, "" + node.value);
  
    if (node.leftChild !== null) {
      const leftX = x - (subtreeWidth / 2 + nodeX);
      drawSubtree(ctx, node.leftChild, leftX, y + INITIAL_ROOT_CHILD_LINE_HEIGHT, subtreeWidth * NEXT_LINE_PROPORTION);
      drawLine(ctx, x, y, leftX, y + INITIAL_ROOT_CHILD_LINE_HEIGHT);
    }
  
    if (node.rightChild !== null) {
      const rightX = x + (subtreeWidth / 2 + nodeX);
      drawSubtree(ctx, node.rightChild, rightX, y + INITIAL_ROOT_CHILD_LINE_HEIGHT, subtreeWidth * NEXT_LINE_PROPORTION);
      drawLine(ctx, x, y, rightX, y + INITIAL_ROOT_CHILD_LINE_HEIGHT);
    }
}
function drawLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

/*  // Use the onload event handler to generate and visualize the binary tree
window.onload = () => {
    generateTree();
    const canvas = document.getElementById("TreePane");
    const ctx = canvas.getContext("2d");
    const nodeX = parseInt(NODE_RADIUS * Math.sqrt(2), 10);
    let counter = 0;
    let currNode = root;
    while (currNode !== null) {
        counter++;
        currNode = currNode.leftChild;
    }
    let halfWidth = 0.0;
    let currLineWidthDifference = INITIAL_ROOT_CHILD_LINE_WIDTH;
    for (let i = 1; i <= counter; i++) {
        halfWidth += nodeX + currLineWidthDifference;
        currLineWidthDifference *= NEXT_LINE_PROPORTION;
    }
    drawTree(ctx, root, halfWidth); // Pass the context of the canvas and halfWidth as parameters
}*/
window.onload = () => {
    generateTree();
    drawTree();
};

