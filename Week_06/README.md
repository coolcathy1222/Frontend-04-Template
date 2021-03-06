#### 浏览器工作原理
渲染过程
URL->HTML->DOM->DOM with CSS->DOM with position->Bitmap

HTTP请求，解析回应，取出HTML，进行parse，生成DOM树，经过CSS Computing，得到一棵带CSS属性的DOM树，进行Layout（布局，排版），得到DOM with position，渲染成一张图片

#### 有限状态机
是为研究有限内存的计算过程和某些语言类而抽象出的一种计算模型。有限状态自动机拥有有限数量的状态，每个状态可以迁移到零个或多个状态，输入字串决定执行哪个状态的迁移。有限状态自动机可以表示为一个有向图。
特点：
+ 状态总数（state）是有限的。
+ 任一时刻，只处在一种状态之中。
+ 某种条件下，会从一种状态转变（transition）到另一种状态。

分类：
+ Moore状态机：输出只和状态有关而与输入无关
+ Mealy状态机：输出不仅和状态有关而且和输入有关系

#### HTTP协议解析
ISO-OSI七层网络模型

+ 应用层 HTTP
+ 表示层
+ 会话层
+ 传输层 TCP
+ 网络层 Internet
+ 数据链路层 4G/5G/Wi-Fi
+ 物理层

TCP层传输数据的概念是流，没有明确的分隔单位，只保证前后顺序正确，全双工通道

端口：计算机的网卡是根据端口把接收到的数据包分给各个应用

libnet：构造IP包并发送

libpcap：从网卡抓取所有的流经你的网卡的IP包

#### HTTP
##### Request
包括：请求行(request line)、请求头部(header)、空行 和 请求数据 四个部分组成。

1. 请求行
method path 协议版本

2. 请求头部
从第二行起为请求头部，行数不固定，每一行是一组KV对。

3. 空行
请求头后面必须有一个空行

4. 请求数据
请求的数据也叫请求体，可以添加任意的其它数据。这个例子的请求体为空。

##### Response
一般情况下，服务器收到客户端的请求后，就会有一个HTTP的响应消息，HTTP响应也由4部分组成，分别是：状态行、响应头、空行和响应体。

1. 状态行
状态行由协议版本号、状态码、状态消息组成

2. 响应头
响应头是客户端可以使用的一些信息，如：Date（生成响应的日期）、Content-Type（MIME类型及编码格式）、Connection（默认是长连接）等等

3. 空行
响应头和响应体之间必须有一个空行

4. 响应体
响应正文

##### 状态码
HTTP协议的状态码由3位数字组成，第一个数字定义了响应的类别，共有5中类别：

+ 1xx: 指示信息--表示请求已接收，继续处理
+ 2xx: 成功--表示请求已被成功接收、理解、接受
+ 3xx: 重定向--要完成请求必须进行更进一步的操作
+ 4xx: 客户端错误--请求有语法错误或请求无法实现
+ 5xx: 服务器端错误--服务器未能实现合法的请求

