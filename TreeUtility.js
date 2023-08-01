/** 
*Musa Yiğit Yayla
*/

const BINARY_TREE_SELECTION = 0;
const BINARY_SEARCH_TREE_SELECTION = 1;
const MAX_NODE_COUNT = 7;
const INITIAL_NODE_COUNT = 7;

let root = null; //root node of our current tree
let array = null;
let currSelection = BINARY_TREE_SELECTION;
let invokeCount = 0; //this is the invoke count of getInorderSuccessor

//expects an integer array as argument with length no more than 7
//creates a complete binary tree from scratch
function createBinaryTree(... arr){
    currSelection = BINARY_TREE_SELECTION;
    generateArray(INITIAL_NODE_COUNT);
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i]; //asdsadsa
        add(curr, arr);
    }
    return root;
}
function createBinarySearchTree(... arr){
    currSelection = BINARY_SEARCH_TREE_SELECTION;
    return createBinaryTree(arr);
}
function preorderTraverse(currNode){
    let str = "";
    if(currNode !== null){
        str += ", " + currNode.value;
        str += preorderTraverse(currNode.leftChild);
        str += preorderTraverse(currNode.rightChild);
    }
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
    if(root != null && root.value === value){
        removeRootBST();
        return true;
    }
    //perform a search correlated with binary search
    //else if(this->nodeExists(givenData)){ //!!!!!! WARNING, YOU MIGHT WANT TO REMOVE THIS LINE AS IT'S ALREADY CHECKED THAT WHETHER NODE EXISTS IN GETNODEANDPARENT!!!!!!
        //retrieve the parent node of the node with givenData and retrieve that node as well
        let nodes = getNodeAndParent(root, value);
        if(nodes != null){
            let nodeToRemove = nodes[0];
            let parent = nodes[1];
            removeHelper(nodeToRemove, parent);
            return true;
        }
    //}
    return false;
    
}
function removeHelper(givenNode, parentNode){
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
        successor = (TreeNode)(getInorderSuccessor(givenNode));
        //retrieve the value of the successor node
        let successorString = successor.value;
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
    if(currNode == NULL){
        return nullptr;
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
        let left = root.leftChild;
        root = null;
        root = left;
    }
    else if(root.leftChild === null && root.rightChild !== null){
        let right = root.RightChild;
        root = null;
        root = right;
    }
    else{
        //root has two children, hence retrieve the inorder successor, and its parent, and delete that node by using regular approaches in the removeHelper
        //then copy the deleted node's contents into our root
        let inorderSuccessor = getInorderSuccessor(root);
        let nodes = getNodeAndParent(root, inorderSuccessor.value);
        let parent = nodes[1];
        let childState = -1;
        if(parent === root && root.rightChild === inorderSuccessor && root.rightChild.rightChild === NULL){
            childState = 1; //right child is the inorder successour
        }
        //delete[] nodes; //delete the additional pointers which are futile

        let isString = inorderSuccessor.str;
        let isCounter = inorderSuccessor.counter;
        removeHelper(inorderSuccessor, parent);
        root.str = isString;
        root.counter = isCounter;
        if(childState === 1){
            root.rightChild = nullptr;
        }
    }
}

//Invoke when we need to get the inorder successor of a node
//given string parameter is the string value of the given node which is about to be removed and certainly has 2 children
//Currently we are not interested with nodes that have only one child or no children
function getInorderSuccessor(currNode){
    invokeCount = 0;
    let returnValue = null;
    if(currNode !== null){
        if(invokeCount === 0){
            invokeCount++;
            returnValue = getInorderSuccessor(currNode.rightChild); //search the right subtree of the given node
        }
        else{
            if(currNode.leftChild === null){ //!!!Problem occurs here because a removed node's address still remains and we try to dereference it
                //this is the leftmost node in our right subtree hence the inorder successor
                //set the invokeCount back to 0 so we can use this method properly later on
                invokeCount = 0;
                return currNode;
            }
            else{
                returnValue = getInorderSuccessor(currNode.leftChild);
            }
        }

    }
    return returnValue;
}
function removeByValueBT(value){
    let newArr = [];

    for(let i = 0; i < array.length; i++){
        if(array[i] !== value){
            newArr.push(array[i]);
        }
    }
    array = newArr;
    createBinaryTree;
}

function add(value, ... arr){
    if(currSelection === BINARY_TREE_SELECTION){
        root = addBTHelper(arr, 0);
    }
    else{
        root = addBSTHelper(arr, 0);
    }
    return root;
}
//Binary Tree insertion helper
function addBTHelper(arr, i){
    let curr = null;
    if(i < arr.length){
        curr = new TreeNode(arr[i]);
        let leftIndex = 2 * i + 1;
        let rightIndex = 2 * i + 2;
        curr.leftChild = addBTHelper(arr, leftIndex);
        curr.rightChild = addBTHelper(arr, rightIndex)
    }
    return curr;
}
function addBSTHelper(currNode, parentNode, value){
    if(root === null){
        let newNode = new Node(value);
        root = newNode;
    }
    else if(currNode === null){//correct position is found insert and link to the parent
        let newNode = new Node(value); 
        if(parentNode.value > value){
            parentNode.leftChild = newNode;
        }
        else{
            parentNode.leftChild = newNode;
        }
    }
    else if(value < currNode.value){
        addBSTHelper(currNode.leftChild, currNode, value);
    }
    else{
        addBSTHelper(currNode.rightChild, currNode, value);
    }
    return root; //the very passed initial root is returned
}
//Will be used when the parent of a child node has to be retrieved
//If the given node is a null pointer or an irrelevant node the function will return false
//If the given node is the predecessor of child node return true
function isParentNode(givenNode, childNode){
    let isParent = false;
    if(givenNode !== NULL && (givenNode.leftChild === childNode || givenNode.rightChild === childNode)){
        isParent = true;
    }
    return isParent;
}
function getNodeCount(){
    let result = 0;
    //result +=     
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