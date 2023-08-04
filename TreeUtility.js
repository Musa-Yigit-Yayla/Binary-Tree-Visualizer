/** 
*Musa Yiğit Yayla
*/

const BINARY_TREE_SELECTION = 0;
const BINARY_SEARCH_TREE_SELECTION = 1;
const MAX_NODE_COUNT = 7;
const INITIAL_NODE_COUNT = 7;

let root = null; //root node of our current tree
//let array = null;
let currSelection = BINARY_TREE_SELECTION;
let invokeCount = 0; //this is the invoke count of getInorderSuccessor

//expects an integer array as argument with length no more than 7
//creates a complete binary tree from scratch
function createBinaryTree() {
    currSelection = BINARY_TREE_SELECTION;
    generateArray(INITIAL_NODE_COUNT);
    /*for (let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        console.log("element " + i + " is: " + curr);
        add(curr, arr);
    }*/
    add(arr[0], arr);
    console.log("Before we pass into the drawTree function we will preorder traverse");
    console.log(preorderTraverse(root));
    //add(arr[0], arr); //!!!! YOU MAY HAVE TO ALTERNATE CREATE BINARY SEARCH TREE
    drawTree(); // Instead of returning root, directly draw the tree
}

function createBinarySearchTree(){
    currSelection = BINARY_SEARCH_TREE_SELECTION;
    arr = [];
    root = null; //DISCARD THE PREVIOUS TREE SO AS TO AVOID CONFLICTS !!!!!
    generateBSTArray();
    console.log("After generateBSTArray the array is: ");
    console.log(arr.join(', '));
    add(arr[0]);
    drawTree();
}
function generateBSTArray() {
    const MAX_LENGTH = 6 + Math.floor(Math.random() * 9 + 1);
    const RANGE_START = 1;
    const RANGE_END = 50;
    arr = [];

    // Helper function to swap elements at given indices in the array
    function swap(i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Helper function to percolate an element down to its correct position in the heap
    function heapify(index) {
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let largestIndex = index;

            if (leftChildIndex < arr.length && arr[leftChildIndex] > arr[largestIndex]) {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex < arr.length && arr[rightChildIndex] > arr[largestIndex]) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex !== index) {
                swap(index, largestIndex);
                index = largestIndex;
            } 
            else {
                break;
            }
        }
    }

    // Generate a max heap by inserting unique elements one by one
    let uniqueSet = new Set();
    let counter = 0;
    while (arr.length < MAX_LENGTH) {
        let newValue;
        if(counter === 0){
            newValue = Math.floor(Math.random() * (Math.floor(RANGE_END / 2) - RANGE_START + 1)) + RANGE_START;
        }
        else{
            newValue = Math.floor(Math.random() * RANGE_END - RANGE_START + 1) + RANGE_START;
        }
        if (!uniqueSet.has(newValue)) {
            arr.push(newValue);
            uniqueSet.add(newValue);

            // Percolate the newly inserted element up to its correct position in the heap
            let currentIndex = arr.length - 1;
            while (currentIndex > 0) {
                let parentIndex = Math.floor((currentIndex - 1) / 2);
                if (arr[currentIndex] <= arr[parentIndex]) {
                    break;
                }

                swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            }
        }
        counter++;
    }

    // Convert the max heap into a valid BST representation
    for (let i = arr.length - 1; i >= 0; i--) {
        swap(0, i); // Move the maximum element to the end of the array
        heapify(0); // Percolate the root element down to its correct position in the heap
    }
    //finally remove duplicates if any
    /*for(let i = 0; i < arr.length; i++){
        let currKey = arr[i];
        for(let j = i; j < arr.length; j++){
            if(currKey === arr[j]){
                delete arr[j];
                j--;
            }
        }
    }*/
}

function preorderTraverse(currNode){
    let str = "";
    if(currNode !== null){
        str += ", " + currNode.value;
        str += preorderTraverse(currNode.leftChild);
        str += preorderTraverse(currNode.rightChild);
    }
    //console.log(str);
    return str;

}
function inorderTraverse(){
    let str = "";
    if(currNode !== null){
        str += inorderTraverse(currNode.leftChild);
        str += ", " + currNode.value;
        str += inorderTraverse(currNode.rightChild);
    }
    return str;
}
function postorderTraverse(){
    let str = "";
    if(currNode !== null){
        str += postorderTraverse(currNode.leftChild);
        str += postorderTraverse(currNode.rightChild);
        str += ", " + currNode.value;
    }
    return str;
}
function removeByValueBST(value){
    let returnValue = false;
    if(root != null && root.value === value){
        //removeRootBST();
        returnValue = true;
    }
    //perform a search correlated with binary search
    //else if(this->nodeExists(givenData)){ //!!!!!! WARNING, YOU MIGHT WANT TO REMOVE THIS LINE AS IT'S ALREADY CHECKED THAT WHETHER NODE EXISTS IN GETNODEANDPARENT!!!!!!
        //retrieve the parent node of the node with givenData and retrieve that node as well
        let nodes = getNodeAndParent(root, value);
        if(nodes !== null){
            let nodeToRemove = nodes[0];
            let parent = nodes[1];
            removeHelper(nodeToRemove, parent);
            returnValue = true;
        }
    //}
    drawTree();
    return returnValue;
    
}
function removeHelper(givenNode, parentNode){
    if(parentNode === null){
        //since the parentNode is passed as null, we presume that the givenNode
        //is infact root
        removeRootBST();
        return;
    }
    let isLeftChild = parentNode.leftChild === givenNode;
    if(givenNode.leftChild === null && givenNode.rightChild === null){
        //simply delete the given node
        givenNode = null;
        if(isLeftChild){
            parentNode.leftChild = null;
        }
        else{
            parentNode.rightChild = null;
        }
    }
    //Node to be removed has one and only one child
    else if(givenNode.leftChild === null && givenNode.rightChild === null){
        let child = givenNode.leftChild;
        givenNode = nullptr;
        if(isLeftChild){
            parentNode.leftChild = child;
        }
        else{
            parentNode.rightChild = child;
        }
    }
    else if(givenNode.rightChild !== null && givenNode.leftChild === null){
        let child = givenNode.rightChild;
        givenNode = null;
        if(isLeftChild){
            parentNode.leftChild = child;
        }
        else{
            parentNode.rightChild = child;
        }
    }
    else{ //the node to be removed has two children
        //retrieve inorder successor
        let successor = null;
        successor = (getInorderSuccessor(givenNode));
        //retrieve the value of the successor node
        let successorString = null;
        if(successor !== null){
            //This certainly implies that our node has two children
            successorString = successor.value;;
        }
        else{
            //we are totally sure that the node to be removed has a single child
            //and it's the node's leftChild. Hence perform removal and return
            let newChild = givenNode.leftChild;
            if(parentNode !== null){
                let isGivenNodeLeftChild = true;
                if(parentNode.rightChild !== null && parentNode.rightChild.value === givenNode.value){
                    isGivenNodeLeftChild = false;
                }
                if(isGivenNodeLeftChild){
                    parentNode.leftChild = newChild;
                }
                else{
                    parentNode.rightChild = rightChild;
                }
            }
            //removal must be successfull now
            return;
        }
        //remove the successor node, but before that retrieve its parent node
        let successorParent = preorderHelper(givenNode, successor, isParentNode);
        this.removeHelper(successor, successorParent);
        //we are guaranteed that the successor is removed successfully by invoking this helper method recursively
        //now we have to copy successor's data to givenNode
        givenNode.value = successorString;
        //delete successor; //it's guaranteed that we have a successor logically since we have 2 child nodes
    }
}
//We want to invoke isParentNode function so we can retrieve the parent node of the searchNode if it exists
//Returns the parent node if it exists, otherwise returns nullptr
//O(logn) time complexity
function preorderHelper( currNode, searchNode, visit){
    if(currNode == null){
        return null;
    }
    if(visit(currNode, searchNode)){
        return currNode;
    }
    let comparison = searchNode.value - currNode.value;
    if(comparison < 0){
        //the searchNode could be located in the left subtree
        return preorderHelper(currNode.leftChild, searchNode, visit);
    }
    else{
        //we disregard the case when comparison == 0 is true because we would have returned the parent node way before
        //search the parent node at the right subtree
        return preorderHelper(currNode.rightChild, searchNode, visit);
    }/* //old implementation, current one has better time complexity and efficiency
    BSTNode* result = this->preorderHelper(currNode->leftChild, searchNode, visit);
    if(result != NULL){
        return result;
    }
    result = this->preorderHelper(currNode->rightChild, searchNode, visit);
    if(result != NULL){
        return result;
    }
    result = nullptr;
    return result;*/
}
function removeRootBST(){
    if(root.leftChild === null && root.rightChild === null){
        root = null;
    }
    else if(root.leftChild !== null && root.rightChild === null){
        console.log("Root to be removed has only a single left child");
        let left = root.leftChild;
        //root = null;
        root = left;
    }
    else if(root.leftChild === null && root.rightChild !== null){
        console.log("Root to be removed has only a single right child");
        let right = root.RightChild;
        //root = null;
        root = right;
    }
    else{
        //root has two children, hence retrieve the inorder successor, and its parent, and delete that node by using regular approaches in the removeHelper
        //then copy the deleted node's contents into our root
        console.log("Root to be removed has two children");
        let inorderSuccessor = getInorderSuccessor(root);
        let nodes = getNodeAndParent(root, inorderSuccessor.value);
        let parent = nodes[1];
        let childState = -1;
        if(parent === root && root.rightChild === inorderSuccessor && root.rightChild.rightChild === null){
            childState = 1; //right child is the inorder successour
        }
        //delete[] nodes; //delete the additional pointers which are futile

        let isValue = inorderSuccessor.value;
        console.log("Root's inorder successor's value is " + isValue + " and its parents value is " + parent.value);
        removeHelper(inorderSuccessor, parent);
        root.value = isValue;
        /*if(childState === 1){
            root.rightChild = null;
        }*/
    }
}
  
  

//Invoke when we need to get the inorder successor of a node
//given string parameter is the string value of the given node which is about to be removed and certainly has 2 children
//Currently we are not interested with nodes that have only one child or no children
function getInorderSuccessor(currNode, invokeCount = 0){
    
    let returnValue = null;
    if(currNode !== null){
        if(invokeCount === 0){
            invokeCount++;
            returnValue = getInorderSuccessor(currNode.rightChild, invokeCount); //search the right subtree of the given node
        }
        else{
            if(currNode.leftChild === null){ //!!!Problem occurs here because a removed node's address still remains and we try to dereference it
                //this is the leftmost node in our right subtree hence the inorder successor
                //set the invokeCount back to 0 so we can use this method properly later on
                invokeCount = 0;
                return currNode;
            }
            else{
                returnValue = getInorderSuccessor(currNode.leftChild, invokeCount);
            }
        }

    }
    return returnValue;
}
/*//below is the older version
function removeByValueBT(value){
    let newArr = [];

    for(let i = 0; i < array.length; i++){
        if(array[i] !== value){
            newArr.push(array[i]);
        }
    }
    arr = newArr;
    createBinaryTree(arr);
}*/
function removeByValueBT(nodeValue) {
    console.log("We are in the removeByValueBT");
    if (arr.length === 0) {
      return;
    }
    console.log("We are in the removeByValueBT1");
    const nodeIndex = arr.indexOf(nodeValue);
    if (nodeIndex === -1) {
      // Node not found in the binary tree
      return;
    }
    console.log("We are in the removeByValueBT2");
    const lastIndex = arr.length - 1;
    if (nodeIndex === lastIndex) {
      // Node to be removed is the last node in the array
      arr.pop();
      console.log("We are in the removeByValueBT3");
    } 
    else {
      // Node to be removed is an inner node
      const lastNodeValue = arr.pop();
      arr[nodeIndex] = lastNodeValue;
      console.log("We are in the removeByValueBT4");
    }
    console.log("We are in the removeByValueBT5");
    createBinaryTreeFromArray();
    drawTree();
  }
  
function add(value){
    /*if(currSelection === BINARY_TREE_SELECTION && arr.length !== 0
        && arr[0] === value){
        root = addBTHelper(0, arr);
        //add the root
    }
    else */if(currSelection === BINARY_TREE_SELECTION){
        //add regular value
        arr.push(value);
        createBinaryTreeFromArray();
        drawTree();
    }
    else{
        if(root === null){
            let newNode = new TreeNode(value);
            root = newNode;
        }
        for(let i = 1; i < arr.length; i++){
            let currValue = arr[i];
            if(currValue > root.value){
                //search right subtree for proper insertion pos
                addBSTHelper( root.rightChild, root, currValue);
            }
            else if(currValue < root.value){
                addBSTHelper( root.leftChild, root, currValue);
            }
        }
        drawTree(); //invoke draw tree just incase we need to redraw the tree here
    }
}
//Binary Tree insertion helper
//This method will only be invoked when we add the root
function addBTHelper(i){
    let curr = null;
    if(i < arr.length){
        curr = new TreeNode(arr[i]);
        let leftIndex = 2 * i + 1;
        let rightIndex = 2 * i + 2;
        curr.leftChild = addBTHelper(leftIndex, arr);
        curr.rightChild = addBTHelper(rightIndex, arr);
        console.log("Curr is: " + curr.value);
        if(curr.leftChild !== null)
            console.log("Curr.left is: " + curr.leftChild.value);
        if(curr.rightChild !== null)
            console.log("Curr.left is: " + curr.rightChild.value);
    }
    return curr;
}
//Use this method instead of addBTHelper
//Will be used when we create regular binary tree
function createBinaryTreeFromArray() {
    if (arr.length === 0) {
      return null;
    }
  
    let newRoot = new TreeNode(arr[0]);
    let parents = [1];
    parents[0] = newRoot;
    
    console.log("Array length in createBTFromArray is: " + arr.length);
    for (let i = 1; i < arr.length; i++) {
      let newNode = new TreeNode(arr[i]);
      let parentNodeIndex = Math.floor((i - 1) / 2);
      let parentNode = parents[parentNodeIndex]; // Get the first node in the queue (parent of the current node)
        console.log("Parent node's data is " + parentNode.value);
      if (parentNodeIndex * 2 + 1 === i && parentNode !== null) {
        console.log("Curr child is left child and its value is " + newNode.value);
        parentNode.leftChild = newNode;
      }
      else if (parentNodeIndex * 2 + 2 === i && parentNode !== null) {
        console.log("Curr child is right child and its value is " + newNode.value);
        parentNode.rightChild = newNode;
      }
  
      parents[parents.length] = newNode; // Add the new node to the array
    }
  
    root = newRoot;
  }
//Second helper for adding binary tree
function addBTHelper2(){

}
function addBSTHelper(currNode, parentNode, value){
    if(currNode === null){//correct position is found insert and link to the parent
        let newNode = new TreeNode(value); 
        if(parentNode.value > value){
            parentNode.leftChild = newNode;
        }
        else if(parentNode.value < value){
            parentNode.rightChild = newNode;
        }
    }
    else if(value < currNode.value){
        addBSTHelper(currNode.leftChild, currNode, value);
    }
    else{
        addBSTHelper(currNode.rightChild, currNode, value);
    }
    //return root; //the very passed initial root is returned
}
//Will be used when the parent of a child node has to be retrieved
//If the given node is a null pointer or an irrelevant node the function will return false
//If the given node is the predecessor of child node return true
function isParentNode(givenNode, childNode){
    let isParent = false;
    if(givenNode !== null && (givenNode.leftChild === childNode || givenNode.rightChild === childNode)){
        isParent = true;
    }
    return isParent;
}
function getNodeCount(){
    let result = 0;
    //result +=     
}
function getNodeAndParent(root, value) {
    let currentNode = root;
    let parentNode = null;
  
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return [currentNode, parentNode];
      } else if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.leftChild;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.rightChild;
      }
    }
  
    // If the value is not found in the BST
    return [null, null];
  }
function postorderNodeCounter(){

}
function contains(x){
    for(let i = 0; i < array.length; i++){
        if(array[i] === x){
            return false;
        }
    }
    return true;
}
//returns a new value to be inserted in the global data field array, which hasn't been included in the array before
function getValue(){
    let returnValue = randomInteger(5, 50);
    while(contains(returnValue)){
        returnValue = randomInteger(5, 50);
    }
    return returnValue;
}
//generates an array of length n with distinct elements
function generateArray(n){
    let index = 0;
    window.array = [];
    while(index < n){
        let currValue = getValue();
        window.array[index++] = parseInt(currValue, 10);
    }
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}