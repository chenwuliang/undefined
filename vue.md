

# 前端框架的出现

要理解前端框架为什么如此重要，需要先看看在框架出现前，前端开发是如何实现和用户进行交互的。

现在有这样一个需求：抢答活动中常常会出现题目和多个答案进行选择，我们现在需要开发一个管理端，对这些抢答卡片进行管理。假设一个问题会包括两个答案，我们可以通过新增卡片的方式来添加一套问答，编辑卡片的过程包括这些步骤。

首先看下以前怎么做的，如果使用jq的话，

1,先插入dom

```js
var index = 0;
// 用来新增一个卡片，卡片内需要填写一些内容
function addCard() {
  // 获取一个id为the-dom的元素
  var body = $("#the-dom");
  // 从该元素内获取class为the-class的元素
  var addDom = body.find(".the-class");
  // 在the-class元素前方插入一个div
  addDom.before('<div class="col-lg-4" data-index="' + index + '"></div>');
  // 同时保存下来该DOM节点，方便更新内容
  var theDom = body.find('[data-index="' + index + '"]');
  theDom.innerHTML(
    `<input type="text" class="form-control question" placeholder="你的问题">
         <input type="text" class="form-control option-a" placeholder="回答1">
         <input type="text" class="form-control option-b" placeholder="回答2">
        `
  );
  // 做完上面这堆之后index自增
  index++;
  return theDom;
}
```



2,卡片内编辑题目和答案时，会有字数限制（使用 jQuery 对输入框的输入事件进行监听，并限制输入内容）。

```js
// theDom使用上面代码保存下来的引用
// 问题绑定值
theDom
  .on("keyup", ".question", function (ev) {
    ev.target.value = ev.target.value.substr(0, 20);
  })
  // 答案a绑定值
  .on("keyup", ".option-a", function (ev) {
    ev.target.value = ev.target.value.substr(0, 10);
  })
  // 答案b绑定值
  .on("keyup", ".option-b", function (ev) {
    ev.target.value = ev.target.value.substr(0, 10);
  });
```

3, 获取输入框内的内容（使用 jQuery 选择元素并获取内容），用于提交到后台。

```js
// 获取卡片的输入值
// theDom 使用上面代码保存下来的引用
function getCardValue(index) {
  var body = $("#the-dom");
  var theDom = body.find('[data-index="' + index + '"]');
  var questionName = theDom.find(".question").val();
  var optionA = theDom.find(".option-a").val();
  var optionB = theDom.find(".option-b").val();
  return { questionName, optionA, optionB };
}
```

可以看到，仅是实现一个问答卡片的编辑就需要编写不少的代码，大多数代码内容都是为了拼接 HTML 内容、获取 DOM 节点、操作 DOM 节点。

下面我们来看使用vue怎么写

```vue
<template>
  <div v-for="card in cards">
    <input
      type="text"
      class="form-control question"
      v-model="card.questionName"
      placeholder="你的问题"
    />
    <input
      type="text"
      class="form-control option-a"
      v-model="card.optionA"
      placeholder="回答1"
    />
    <input
      type="text"
      class="form-control option-b"
      v-model="card.optionB"
      placeholder="回答2"
    />
  </div>
</template>
<script>
  export default {
    name: "Cards",
    data() {
      return {
        cards: [],
      };
    },
    methods: {
      // 添加一个卡片
      addCard() {
        this.cards.push({
          questionName: "",
          optionA: "",
          optionB: "",
        });
      },
      // 获取卡片的输入值
      getCardValue(index) {
        return this.cards[index];
      },
    },
  };
</script>
```

可见，前端框架提供了便利的数据绑定、界面更新、事件监听等 API，我们不需要再手动更新前端页面的内容、维护一大堆的 HTML 和变量拼接的动态内容了。
使用前端框架对开发效率有很大的提升，同时也在一定程度上避免了代码可读性、可维护性等问题。这也是为什么前端框架这么热门，大家都会使用它来进行开发的原因。

那么，前端框架是怎么做到这些的呢？要实现这些能力，离不开其中的模板引擎。



# 前端框架的核心——模板引擎

当用户对页面进行操作、页面内容更新，我们需要实现的功能流程包括：

1. 监听操作；

2. 获取数据变量；

3. 使用数据变量拼接成 HTML 模板；

4. 将 HTML 内容塞到页面对应的地方；

5. 将 HTML 片段内需要监听的点击等事件进行绑定。


可以看到，实现逻辑会比较复杂和烦琐。

如果使用前端框架，我们可以：

- 使用将数据变量绑定到 HTML 模板的方式，来控制展示的内容；

- 配合一些条件判断、条件循环等逻辑，控制交互的具体逻辑；

- 通过改变数据变量，框架会自动更新页面内容。

这样，我们可以快速高效地完成功能开发，代码的可读性和维护性都远胜于纯手工实现。

如果使用数据驱动的方式，还可以通过让逻辑与 UI 解耦的方式，提升代码的可维护性。其中的数据绑定、事件绑定等功能，前端框架是依赖模板引擎的方式来实现的。

以 Vue 为例子，对于开发者编写的 Vue 代码，Vue 会将其进行以下处理从而渲染到页面中：

- 解析语法生成 AST 对象；

- 根据生成的 AST 对象，完成data数据初始化；

- 根据 AST 对象和data数据绑定情况，生成虚拟 DOM 对象；

- 将虚拟 DOM 对象生成真正的 DOM 元素插入到页面中，此时页面会被渲染。


模板引擎将模板语法进行解析，分别生成 HTML DOM，使用像 HTML 拼接的方式（在对应的位置绑定变量、指令解析获取拼接逻辑等等），同时配合事件的管理、虚拟 DOM 的设计，可以最大化地提升页面的性能。

这些便是模板引擎主要的工作，我们来分别看一下。



# 解析语法生成 AST 对象

抽象语法树（Abstract Syntax Tree）也称为 AST 语法树，指的是源代码语法所对应的树状结构。其实我们的 DOM 结构树，也是 AST 的一种，浏览器会对 HTML DOM 进行语法解析、并生成最终的页面。

生成 AST 的过程涉及编译器的原理，一般经过以下过程。

- 语法分析。模板引擎需要在这个过程中识别出特定的语法，比如`v-if/v-for`这样的指令，或是<MyCustomComponent>这样的自定义 DOM 标签，还有`@click/:props`这样的简化绑定语法等。

- 语义分析。这个过程会审查源程序有无语义错误，为代码生成阶段收集类型信息，一般类型检查也会在这个过程中进行。例如我们绑定了某个不存在的变量或者事件，又或者是使用了某个未定义的自定义组件等，都会在这个阶段进行报错提示。


- 生成 AST 对象。

以 Vue 为例，生成 AST 的过程包括 HTML 模板解析、元素检查和预处理：

```js
/**
 *  将HTML编译成AST对象
 *  该代码片段基于Vue2.x版本
 */
export function parse(
  template: string,
  options: CompilerOptions
): ASTElement | void {
  // 返回AST对象
  // 篇幅原因，一些前置定义省略
  // 此处开始解析HTML模板
  parseHTML(template, {
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start(tag, attrs, unary) {
      // 一些前置检查和设置、兼容处理此处省略
      // 此处定义了初始化的元素AST对象
      const element: ASTElement = {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: [],
      };
      // 检查元素标签是否合法（不是保留命名）
      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== "production" &&
          warn(
            "Templates should only be responsible for mapping the state to the " +
              "UI. Avoid placing tags with side-effects in your templates, such as " +
              `<${tag}>` +
              ", as they will not be parsed."
          );
      }
      // 执行一些前置的元素预处理
      for (let i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }
      // 是否原生元素
      if (inVPre) {
        // 处理元素的一些属性
        processRawAttrs(element);
      } else {
        // 处理指令，此处包括v-for/v-if/v-once/key等等
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);
        // 确定这是否是一个简单的元素
        element.plain = !element.key && !attrs.length;
        // 处理ref/slot/component等属性
        processRef(element);
        processSlot(element);
        processComponent(element);
        for (let i = 0; i < transforms.length; i++) {
          transforms[i](element, options);
        }
        processAttrs(element);
      }
      // 后面还有一些父子节点等处理，此处省略
    },
    // 其他省略
  });
  return root;
}
```

 举个例子，我们写了以下这么一段 HTML 模板：

```html
<div>
  <a>123</a>
  <p>456<span>789</span></p>
</div>
```



模板引擎可以在语法分析、语义分析等步骤后，得到这样的一个 AST 对象

```js
thisDiv = {
  dom: {
    type: "dom",
    ele: "div",
    nodeIndex: 0,
    children: [
      {
        type: "dom",
        ele: "a",
        nodeIndex: 1,
        children: [{ type: "text", value: "123" }],
      },
      {
        type: "dom",
        ele: "p",
        nodeIndex: 2,
        children: [
          { type: "text", value: "456" },
          {
            type: "dom",
            ele: "span",
            nodeIndex: 3,
            children: [{ type: "text", value: "789" }],
          },
        ],
      },
    ],
  },
};
```

或许你会觉得疑惑：原本就是一个<div>HTML 模板，经过 AST 生成一个对象，最终还是生成一个<div>DOM 节点，看起来好像挺多余的。



模板引擎的作用：

1. 排除无效 DOM 元素（非自定义组件、也非默认组件的 DOM 元素），在构建阶段可及时发现并进行报错；

2. 可识别出自定义组件，并渲染对应的组件；

3. 可方便地实现数据绑定、事件绑定等功能；

4. 为虚拟 DOM Diff 过程打下铺垫；

5. HTML 转义（预防 XSS 漏洞）。



# 提问

## AST和VNode的区别

Vue最核心的三部分，即：compiler、reactivity、runtime。



- compiler表示template编译成有规律的数据结构，即AST抽象语法树。
- reactivity表示data数据可以被监控，通过proxy语法来实现。
- runtime表示运行时相关功能，虚拟DOM(即：VNode)、diff算法、真实DOM操作等。



template > ast > render function > 执行 render function > VNode>

AST和VNode的职责是不同的，不能进行等价划分；即AST时compiler中把模板编译成有规律的数据结构，方便转换成render函数所存在的；而VNode是优化DOM操作的，减少频繁DOM操作的，提升DOM性能的。



## 简单说一下 Vue 的编译器都做了什么？

Vue 的编译器做了三件事情：

- 将组件的 html 模版解析成 AST 对象
- 优化，遍历 AST，为每个节点做静态标记，标记其是否为静态节点，然后进一步标记出静态根节点，这样在后续更新的过程中就可以跳过这些静态节点了；标记静态根用于生成渲染函数阶段，生成静态根节点的渲染函数
- 从 AST 生成运行渲染函数，即大家说的 render，其实还有一个，就是 staticRenderFns 数组，里面存放了所有的静态节点的渲染函数



## 详细说一下静态标记的过程

- 标记静态节点
  - 通过递归的方式标记所有的元素节点
  - 如果节点本身是静态节点，但是存在非静态的子节点，则将节点修改为非静态节点

- 标记静态根节点，基于静态节点，进一步标记静态根节点
  - 如果节点本身是静态节点 && 而且有子节点 && 子节点不全是文本节点，则标记为静态根节点
  - 如果节点本身不是静态根节点，则递归的遍历所有子节点，在子节点中标记静态根

/src/compiler/optimizer.js

```js
/**
 * 优化：
 *   遍历 AST，标记每个节点是静态节点还是动态节点，然后标记静态根节点
 *   这样在后续更新的过程中就不需要再关注这些节点
 */
export function optimize(root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  /**
   * options.staticKeys = 'staticClass,staticStyle'
   * isStaticKey = function(val) { return map[val] }
   */
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  // 平台保留标签
  isPlatformReservedTag = options.isReservedTag || no
  // 遍历所有节点，给每个节点设置 static 属性，标识其是否为静态节点
  markStatic(root)
  // 进一步标记静态根，一个节点要成为静态根节点，需要具体以下条件：
  // 节点本身是静态节点，而且有子节点，而且子节点不只是一个文本节点，则标记为静态根
  // 静态根节点不能只有静态文本的子节点，因为这样收益太低，这种情况下始终更新它就好了
  markStaticRoots(root, false)
}

```



```js
/**
 * 在所有节点上设置 static 属性，用来标识是否为静态节点
 * 注意：如果有子节点为动态节点，则父节点也被认为是动态节点
 * @param {*} node 
 * @returns 
 */
function markStatic(node: ASTNode) {
  // 通过 node.static 来标识节点是否为 静态节点
  node.static = isStatic(node)
  if (node.type === 1) {
    /**
     * 不要将组件的插槽内容设置为静态节点，这样可以避免：
     *   1、组件不能改变插槽节点
     *   2、静态插槽内容在热重载时失败
     */
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      // 递归终止条件，如果节点不是平台保留标签  && 也不是 slot 标签 && 也不是内联模版，则直接结束
      return
    }
    // 遍历子节点，递归调用 markStatic 来标记这些子节点的 static 属性
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      // 如果子节点是非静态节点，则将父节点更新为非静态节点
      if (!child.static) {
        node.static = false
      }
    }
    // 如果节点存在 v-if、v-else-if、v-else 这些指令，则依次标记 block 中节点的 static
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}
```



## 什么样的节点才可以被标记为静态节点？

- 文本节点
- 节点上没有 v-bind、v-for、v-if 等指令
- 非组件

/src/compiler/optimizer.js

```js
/**
 * 判断节点是否为静态节点：
 *  通过自定义的 node.type 来判断，2: 表达式 => 动态，3: 文本 => 静态
 *  凡是有 v-bind、v-if、v-for 等指令的都属于动态节点
 *  组件为动态节点
 *  父节点为含有 v-for 指令的 template 标签，则为动态节点
 * @param {*} node 
 * @returns boolean
 */
function isStatic(node: ASTNode): boolean {
  if (node.type === 2) { // expression
    // 比如：{{ msg }}
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

```

