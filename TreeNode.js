/**
 * This class represents a tree node
 * 
 */
class TreeNode{
    value;
    leftChild;
    rightChild;
    constructor(value){
        this.value = parseInt(value, 10);
        this.leftChild = null;
        this.rightChild = null;
    }

}