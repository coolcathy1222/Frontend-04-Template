#### HTML的定义：XML与SGML

HTML：数据描述语言，有一定的继承关系，主要源流来自于XML和SGML,发展到HTML5以后的时代，HTML跟它们的关系已经变得模糊，HTML变成了一个接受了XML和SGML的一定灵感的独立的语言。

SGML是上世纪60年代末，最早由IBM使用的一个数据描述语言，它是一个非常庞大非常复杂的一个数据描述的系统，在更往后，作为SGML的一个比较流行的子集XML开始加入了一些其他的规定和改良，HTML出来的年代基本上完全使用了SGML的一个子集的定义方式，所以它有符合SGML定义的DTD，到了后期，W3C对它做了XML化的尝试，所以就有了XHTML的版本，在更晚期XHTML2出现了并流产。后来随着HTML5逐渐再次重新定义了HTML和这两个语言的关系，才得到了我们今天的HTML。

+ DTD与XML namespace

DTD是SGML规定的定义它的子集的一种文档的格式

重点：
实体定义：
+ nbsp，问题：当我们使用nbsp去连接两个词的时候，它会认为是一个词，这样在排版的时候就会出现分词的问题（破坏了语义），建议使用CSS里面的white-space属性去控制空格被显示出来
+ symbol：lambda等
+ special：auot amp lt gt

注意：HTML5已经不再有这种风格的DTD，HTML5也不再认为自己是SGML的一个子集，所以从DTD去了解HTML已经到此为止了。

XML namespace

在HTML里面，除了HTML、XHTML的namespace，还有两种：MathML和SVG
namespace：提供一些说明的地址，里面包含了一些链接，都是一些说明

#### HTML标签语义
HTML本身是一个语义系统，我们并不需要关心它的表现是什么样的，应该首先保证它的语义表达的正确，然后再 关注它的表现的部分
+ aside 工具类部分
+ main 页面主题内容
+ article 文章主体内容
+ h1 主标题
+ h2 副标题
+ hgroup 将几个共同构成完整部分的子元素包含起来
+ hr 一个break信号（改变故事走向、切换话题的场景）
+ 没有合适的标签或者并不了解合适的标签去处理某一个语义的时候，可以使用class作为一个补充
+ abbr 缩写
+ strong 强调某个词语在文章中的重要性
+ em 表示在这个句子里面强调的重点的词
+ figure 下面带说明的图表等
+ figcaption 图表下面的说明文字
+ li 列表项
+ nav 导航
+ dfn 定义
+ pre 预先调整好格式的文本

#### HTML语法

合法元素

+ Element:<tagname>...</tagname>
+ Text:text
+ Comment:<!--comments-->
+ DocumentType:<!Doctype html>
+ ProcessingInstruction:<?a 1?>一种预处理的语法，留出来问号后面的内容去给一些预处理程序使用。处理器名字后面跟数据，以一个空格作为分割
+ CDATA:<![CDATA[]]>一种特殊语法，产生文本节点，CDATA节点里面支持的文本不需要考虑转义问题，从XML继承过来的信息，是文本的另一种语法的表达

字符引用

+ &#161;
+ &amp;
+ &lt;
+ &quot;

#### DOM API
### 节点
Node（所有DOM树上能挂着的东西都统一继承自Node类）

+ Element：元素型节点，跟标签相对应
+ Document：文档根节点
+ CharacterData：字符数据
+ DocumentFragment：文档片段
+ DocumentType：文档类型

Element（几个常用的namespace都会产生一个Element的子类）

+ HTMLElement
> HTMLAnchorElement
> HTMLAppletElement
> ...
+ SVGElement
> SVGAElement
> SVGAltGlyphElement
> ...

CharacterData

+ Text：文本节点
+ Comment：注释
+ ProcessingInstruction：处理信息


### 导航类操作

## 节点的导航

+ parentNode
+ childNodes
+ firstChild
+ lastChild
+ nextSibling
+ previousSibling

## 元素的导航

+ parentElement
+ children
+ firstElementChild
+ lastElementChild
+ nextElementSibling
+ previousElementSibling

### 修改操作

+ appendChild
+ insertBefore
+ removeChild
+ replaceChild

### 高级操作
+ compareDocumentPosition是一个用于比较两个节点中关系（前后）的函数
+ contains检查一个节点是否包含另一个节点的函数
+ isEqualNode检查两个节点是否完全相同
+ isSameNode检查讲个节点是否是同一个节点，实际上在JavaScript中可以用“===”
+ cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝

#### 事件API
addEventListener参数
+ type
+ listener
+ options

1. 可以是true或者false，可以改变事件的模式，捕获还是冒泡
2. options允许传入更多信息
capture：捕获还是冒泡
once：事件是否只响应一次
passive：事件是否会产生副作用（使用onScroll这样高频次触发的事件的时候，传入passive参数，可以起到提升性能的效果。如果想在事件发生的时候不去阻止该事件的某些默认行为的话，需传入true）参考知识：https://www.cnblogs.com/ziyunfei/p/5545439.html

Event：冒泡与捕获
冒泡：已经计算出点到了那个元素，层层向外触发，让元素去响应事件的过程
捕获：从外到内，一层一层地去计算事件发生在哪个元素上的一个过程

#### Range API

range可以理解为HTML文档流里面的有起始点和终止点的一段范围。只要起点位置先于重点就可以，不需要管层级关系。起止点都是由一个element和一个偏移值来决定，对于element来说，偏移值就是children，对于text node来说，偏移值就是文字的个数。range可以包含半个节点，选择范围非常灵活，可以在DOM树上任意选择一段。

+ var range = new Range()
+ range.setStart(element, 9)
+ range.setEnd(element, 4)
+ var range = document.getSelection().getRangeAt(0)

+ range.setStartBefore
+ range.setEndBefore
+ range.setStartAfter
+ range.setEndAfter
+ range.selectNode
+ range.selectNodeContents 选中一个元素的所有内容

+ var fragment = range.extractContents() 得到一个fragment对象，是node的子类
+ range.insertNode(document.creatteTextNode("aaaa"))

#### CSSOM
对CSS文档的抽象就是CSSOM
### document.styleSheets
CSS的一切API都需要通过document.styleSheets这个属性去访问。

如何创建styleSheets

+ style标签
+ link标签

可以在CSSOM里面访问并修改其内容

### Rules
+ document.styleSheets[0].cssRules
+ document.styleSheets[0].insertRule("p {color:pink}", 0)
+ document.styleSheets[0].removeRule(0)

### Rule
CSS规则分为at-rule和普通rule
+ CSSStyleRule（普通rule）
+ CSSCharsetRule
+ CSSImportRule
+ CSSMediaRule
+ CSSFontfaceRule
+ CSSPageRule
+ CSSNamespaceRule
+ CSSKeyframesRule
+ CSSKeyframeRule
+ CSSSupportsRule
+ ...

## CSSStyleRule
+ selectorText String
+ style K-V结构

## getComputedStyle
window.getComputedStyle(elt, pseudoElt)
+ elt 想要获取的元素
+ pseudoElt 可选，伪元素

#### CSSOM View

### window
+ window.innerHeight,window.innerWidth HTML的内容实际上渲染所用的区域
+ window.outerHeight,window.outerWidth 浏览器窗口总共占的尺寸
+ devicePixelRatio 物理像素跟逻辑像素px之间的比值
+ window.screen(width,height,availWidth,availHeight)实际屏幕宽高、可使用宽高

### window API
打开新的浏览器窗口时使用
+ window.open("about:blank", "_blank", "width=100,height=100,left=100,right=100")
+ moveTo(x,y)
+ moveBy(x,y)
+ resizeTo(x,y)
+ resizeBy(x,y)

### scroll
## 元素相关
+ scrollTop
+ scrollLeft
+ scrollWidth
+ scrollHeight
+ scroll(x,y)
+ scrollBy(x,y)
+ scrollIntoView(x,y)

## window相关
+ scrollX
+ scrollY
+ scroll(x,y)
+ scrollBy(x,y)

### layout
+ getClientRects()
+ getBoundingClientRect()

#### 其它API

### 标准化组织
+ khronos WebGL
+ ECMA ECMAScript
+ WHATWG HTML
+ W3C webaudio CG/WG