/**
 * This class represents a tree node
 * 
 */
class TreeNode{
    value;
    leftChild = null;
    rightChild = null;
    constructor(value){
        value = parseInt(value, 10);
        this.value = value;
    }

}