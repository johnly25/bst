class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = [...new Set(array)].sort(function (a, b) { return a - b });
        this.root = this.buildTree(this.array);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }
        let mid = Math.floor(((start + end) / 2));
        let root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    insert(value) {
        this.root = this.insertRec(this.root, value);
    }

    insertRec(root, value) {
        if (root == null) {
            root = new Node(value);
            return root;
        }
        if (value < root.data) {
            root.left = this.insertRec(root.left, value);
        } else if (value > root.data) {
            root.right = this.insertRec(root.right, value);
        }
        return root;
    }

    delete(value) {
        this.root = this.deleteRec(this.root, value);
    }

    deleteRec(root, value) {
        if (!root) {
            return root;
        }

        if (root.data > value) {
            root.left = this.deleteRec(root.left, value);
            return root;
        } else if (root.data < value) {
            root.right = this.deleteRec(root.right, value);
            return root;
        }

        if (!root.left) {
            let temp = root.right;
            return temp;
        } else if (!root.right) {
            let temp = root.left;
            return temp;
        }
        else {
            let succParent = root;
            let succ = root.right;
            while (succ.left != null) {
                succParent = succ;
                succ = succ.left;
            }
            if (succParent != root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.data = succ.data;

            return root;
        }
    }

    find(value) {
        return this.findRec(this.root, value);
    }

    findRec(root, value) {
        if (!root || root.data == value) {
            return root;
        }

        if (root.data < value) {
            return this.findRec(root.right, value)
        }
        return this.findRec(root.left, value);
    }

    levelOrder(callback) {
        if (this.root == null) {
            return;
        }

        let queue = [];
        let results = [];
        queue.push(this.root);

        while (queue.length != 0) {
            let current = queue.shift();
            if (callback) {
                callback(current);
            } else {
                results.push(current.data);
            }
            if (current.left != null) {
                queue.push(current.left);
            }
            if (current.right != null) {
                queue.push(current.right);
            }
        }
        if (!callback) {
            return results;
        }
    }

    inOrder(callback, root = this.root, results = []) {
        if (!root) {
            return;
        }
        this.inOrder(callback, root.left, results);
        if (!callback) {
            results.push(root.data);
        } else {
            callback(root.data);
        }

        this.inOrder(callback, root.right, results);

        if (!callback) {
            return results;
        }
    }

    preOrder(callback, root = this.root, results = []) {
        if (!root) {
            return;
        }
        if (!callback) {
            results.push(root.data);
        } else {
            callback(root.data);
        }
        this.preOrder(callback, root.left, results);
        this.preOrder(callback, root.right, results);
        if (!callback) {
            return results;
        }
    }

    postOrder(callback, root = this.root, results = []) {
        if (!root) {
            return;
        }
        this.postOrder(callback, root.left, results);
        this.postOrder(callback, root.right, results);
        if (!callback) {
            results.push(root.data);
        } else {
            callback(root.data);
        }


        if (!callback) {
            return results;
        }
    }

    height(root = this.root) {
        if (!root) {
            return -1;
        }
        return Math.max(this.height(root.left), this.height(root.right)) + 1;
    }
    depth(root = this.root) {
        if (!root) {
            return -1;
        }
        let left = this.depth(root.left);
        let right = this.depth(root.right);
        return Math.max(left, right) + 1;
    }
    isBalanced(root = this.root) {
        if (!root) {
            return true;
        }
        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)) {
            return true;
        }
        return false;
    }

    rebalance() {
        let array = [...new Set(this.inOrder())].sort(function (a, b) { return a - b });
        this.root = this.buildTree(array);
    }

    printArray() {
        for (let i = 0; i < this.array.length; i++) {
            console.log(this.array[i]);
        }
    }
}

function createArray(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        let number = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
        array.push(number);
    }
    return array;
}

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

let array = createArray(11);
let bst = new Tree(array);
console.log(bst.isBalanced());
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
bst.insert(101)
bst.insert(102)
bst.insert(200);
console.log(bst.isBalanced());
bst.rebalance();
console.log(bst.isBalanced());
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
console.log(prettyPrint(bst.root));