window.dom = {
    //新增
    create(string) {
        //新增节点
        const container = document.createElement("template");
        //trim()去掉两边的空格,使用template时,用content获取元素
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    //新增弟弟
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);

    },
    //新增哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);

    },
    //新增儿子
    append(parent, node) {
        parent.appendChild(node);

    },
    //新增爸爸
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);

    },
    //删除
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const array = []
        let firstChild = node.firstChild
        while (firstChild) {
            array.push(dom.remove(node.firstChild))
            firstChild = node.firstChild
        }
        return array
    },
    //修改
    //用于读写属性
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //用于读写文本内容
    text(node, String) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = String//ie
            } else {
                node.textContent = String//firefox/Chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    //用于读写 HTML 内容
    html(node, string) {
        if (arguments === 2) {
            node.innerHTML = string
        } else if (arguments === 1) {
            return node.innerHTML
        }
    },
    //用于修改 style
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },

    class: {
        add(node, classNme) {
            node.classList.add(classNme)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    // 用于添加事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    // 用于删除事件监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //用于获取标签或标签们
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // dom.parent(node) 用于获取父元素
    parent(node) {
        return node.parentNode
    },
    // dom.children(node) 用于获取子元素
    children(node) {
        return node.childNodes
    },
    // dom.siblings(node) 用于获取兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    // dom.next(node) 用于获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    // dom.previous(node) 用于获取哥哥
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // dom.each(nodes, fn) 用于遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    // dom.index(node) 用于获取排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i

    },



};