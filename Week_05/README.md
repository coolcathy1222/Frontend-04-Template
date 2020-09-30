# 学习笔记
## 1.JS表达式|运算符和表达式
###	Atom
> + 		Grammar
>> + 			Grammar Tree vs Priority
>> +			Left hand side & Right hand side
> + 		Runtime
>> + 			Type Convertion
>> + 			Reference
	运算符优先级会影响语法树的构成
	在JavaScript标准中，用产生式来描述运算符的优先级

###	Expressins
> +		Member
```
			a.b 成员访问
			a[b] 成员访问，支持运行时的字符串
			foo`string` 反引号字符串前面加一个函数名，会把这个反引号的字符串部分拆开，传进这个函数当做参数。此运算优先级较高，跟Member运算属于同一级（与Member运算没有关系）
			super.b super关键字只有在class构造函数里面可用，优先级与变量点一样
			super['b']	
			new.target 前后两个词都固定，与Member运算优先级一致
			new Foo() 带()的new与之前的优先级相同
```
> +		New
```
			new Foo 不带()的new被单独的设为一个优先级，称为new表达式
```
	例子：
	new a()() 在member表达式中，new()结构的优先级更高，所以第一个()是跟着new运算符的
	new new a() 带()的new运算的优先级更高，所以()会跟第二个new优先结合

	###	Reference
+ 		使用a.b访问属性，但是从属性取出来的不是属性的值，而是一个引用，此种类型，被称为标准中的类型，而不是语言中的类型。
		reference分为两部分：对象，key。key可以为string、symbol
+ 		delete、assign会用到reference类型，JavaScript语言使用引用类型在运行时来处理删除或复制这样的写相关的操作

###	Expressions
Call
+			foo() 优先级低于new，也低于前面所有member运算
+			super()
+			foo()['b']在()之后加上取属性，会让表达式降级为Call Expression，后面的点运算优先级也降低了
+			foo().b
+			foo()`abc`

    语法结构能够表达的内容多于运算符优先级所能表达的内容。点运算本身就可以有不同的优先级，它用前面的语法结构来决定自己的优先级，带()的属性的优先级比不带()的要低两级。所以我们用优先级解释运算符并不严谨，真正严谨的还是使用产生式，一级一级的语法结构来描述运算的优先顺序

	例子：new a()['b'] ()应该先跟new结合：带()的new是一个Member Expression，优先级要高于Call Expression，[]也被Call Expression拉低了优先级。可以理解为：new一个a对象，访问它的b属性

###	Expressions
+ 	Left Handside  a.b = c 能放到=左边的
+ 	Right Handside a+b = c Left Handside Expression几乎一定是Right Handside Expression
> +		Update
```
    		a++
    		a--
    		--a
    		++a
```

###	Expressions
+		Unary 单目运算符
```
			delete a.b 后面必须是reference类型才能生效
			void foo() 把后面的东西变成undefined
			typeof a
			+ a 不会改变a的值，a如果是字符串的话，会进行类型转换
			- a
			~ a 按位取反
			! a 针对布尔型的运算，可使用!!将任意类型的数据强制转换为布尔类型
			await a	对后续的语法造成影响
```
+		Exponental
```
			** js中唯一一个右结合的运算符
			Example 3 ** 2 ** 3 => 3 ** (2 ** 3)
```

###	Expressions 
优先级更低一点
> + 	Multiplicative
			* / %
> + 	Additive
			+ -
> + 	Shift
			<< >> >>>
> + 	Relationship
            < > <= >= instanceof in

优先级更低一点
> + 	Equality
```
		==
		!=
		===
		!==
```
> + 	Bitwise 更低
```
		& ^ |
```

优先级更低一点
> +		Logical
```
			&&
			||
```
> + 	Conditional
```
			？： 短路逻辑
```

## 2.JS表达式|类型转换

###	Type Convertion
+		a + b 数字和字符串：数字转为字符串
+		"false" == false false 尽量使用===
+		a[0] = 1

转换

+		number 0 false 其他true
+		string 空 false 其他true
+		boolean true 1 false 0
+		undefined Number NaN string "undefined" boolean false 无法转为object
+		null Number 0 string "null" boolean false 无法转为object
+		object Number调用valueOf String valueOf toString boolean true
+		symbol 只能通过boxing转为object

###	Unboxing拆箱转换（将object转为基础类型）
+		ToPremitive object参与加法
+		toString vs valueOf
+		Symbol.toPrimitive 如果定义了此项会忽略上面两项，否则在进行不同转换时，会按提示决定调用toString和valueOf的先后
+		加法优先调用valueOf，o作为属性名(x[o]）会优先调用toString

###	Boxing装箱转换
+		Number new Number(1) Number对象与1存在一个装箱关系
+		String new String("a")
+		Boolean new Boolean(true)
+		Symbol new Object(Symbol("a"))

	使用点或[]访问属性时，如果点之前的变量或表达式得到的是一个基础类型，会自动调用装箱过程

## 3.JS语句|运行时相关概念
+    Statement
> +        Grammar
>> +            简单语句
>> +            组合语句
>> +            声明
> +        Runtime
>> +            Completion Record 语句执行结果的记录：是否返回？返回值是什么？等等
>> +            Lexical Environment 作用域
    
+    Completion Record
> +        [[type]]: normal,break,continue,return,throw
> +        [[value]]: 基本类型 如表达式语句有返回值，return throw语句所带的值
> +        [[target]]: label 语句前面加上一个标识符和一个冒号，break、continue语句可能与label语句产生交互

## 4.JS语句|简单语句和复合语句
+    简单语句
> +     ExpressionStatement
> +     EmptyStatement 语言的完备性允许只有一个;的空语句
> +     DebuggerStatement debugger;调试时候使用的语句
> +     ThrowStatement 控制语句，抛出一个异常
> +     ContinueStatement 与循环语句相匹配
> +     BreakStatement
> +     ReturnStatement
+    复合语句
> +     BlockStatement {}中间的语句列表，能够把我们所有需要单条语句的地方都变成可用多条语句，是完成语句树状结构的重要基础设施
> +     IfStatement
> +      SwitchStatement
> +     IterationStatement while for等
> +     WithStatement 不稳定性高，在现代js编程语言规范中都拒绝使用
> +     LabelledStatement 配合IterationStatement使用
> +     TryStatement 三段结构 try catch finally

+    block

        BlockStatement 可容纳多个语句
```
        {
            ...
        }
```
> +     [[type]]: normal
> +     [[value]]: 
> +     [[target]]: --

+    Iteration
```
        while
        do while
        for 可加变量声明，var const let，可产生不同的声明效果
        for in
        for of
        for await( of) for of的await版本，对应Async Generator
```
```
        var 
        const/let
        in
```
        
        for语句会产生一个独立的let声明作用域，与里面的语句分别属于两个作用域。不同的循环之间可以改变声明的变量，i可以改变并且跨循环保存  
        
        for in用掉了in字符，所以在for循环的结构里面，大部分不允许in操作符出现。JavaScript标准里面，所有语句基本上都会有没有in的版本和有in的版本两个

+   标签、循环、break、continue
> +    	LabelledStatement
> +    	IterationStatement
> +    	ContinueStatement
> +    	BreakStatement
> +    	SwitchStatement

    	[[type]]: break continue
    	[[value]]: --
    	[[target]]: label

    break后面可以跟一个标识符的名字，即label。带label的break可以一下子跳出多层的循环，可以节省很多if语句的判断和一些逻辑

+    try
```
    	try{
    		...
    	}catch(){
    		...
    	}finally{
    		...
    	}

    	[[type]]: return
    	[[value]]: --
    	[[target]]: label
```
    	try的花括号是必须的，catch会产生一个作用域，catch后面圆括号里面的变量被赋值为try里面抛出来的错误
    	在此结构中，即使你在try里面return了，finally里面的代码也一定会继续执行

## 5.JS语句|声明

+	声明
> +     FunctionDeclaration
> +		GeneratorDeclaration Function关键字后面加*
> +		AsyncFunctionDeclaration 异步函数声明
> +		AsyncGeneratorDeclaration 异步产生器声明
> +		VariableStatement 既有声明的作用，又有实际的执行计算的能力
> +		ClassDeclaration
> +		LexicalDeclaration const let

+	声明
```
		function
		function *
		async function
		async function *
		var var a = 1,a变量已经被声明为一个函数级的局部变量，但是后面的赋值并没有发生
		共性：作用范围只认Function Body，且没有先后关系，永远会被当做出现在函数的第一行一样去处理
```
```
		class
		const
		let
```
		共性：当你在它们的声明之前使用的时候会报错，推荐使用


+	预处理

		var提前找到所有的var声明的变量并使其生效  
		
		所有的声明都有预处理机制，都能把变量变成一个局部变量，区别在于，const声明的变量在你声明之前使用的话会抛错，并且这个错误是可以被try和catch处理的


+	作用域

		作用域链已过气  
		
		var的作用域是所在的函数体  
		
		const的所用域为它所在的{}  
		
		有一些循环语句可以在里面加const声明，如果在此使用了const或let声明，作用域就是整个的循环语句，它比循环语句里面的{}范围要大，因为每次循环都不产生新的
		可以用{}将函数分成小节

## 6. JS结构化|宏任务和微任务

+	JS执行粒度（运行时）
> +		宏任务 传给JavaScript引擎的任务
> +		微任务（Promise） 在JavaScript引擎内部的任务，由Promise产生的。微任务可能会分成几个不同的函数调用
> +		函数调用（Execution Context）
> +		语句/声明（Completion Record）
> +		表达式（Reference）
> +		直接量/变量/this

+	宏任务与微任务
+	事件循环
> +		wait 等待时间或者事件，一般来说在OC中会把它实现成等待一个锁，有不同的条件去触发锁，来继续执行，所以事件循环将会是一个独立的线程
> +		get code
> +		execute


## 7. JS结构化|JS函数调用
+	函数调用

		函数调用会形成一个Stack，能访问的变量也可以用Stack描述
		
		Execution Context Stack 执行上下文栈。保存Execution Context的数据结构
		
		Execution Context 执行上下文，执行一个语句的时候，所需要的所有信息都会保存在Execution Context里面

		当我们执行到当前语句的时候，这个栈有一个栈顶元素，栈顶元素就是我们当前能够访问到的所有的变量，这些变量有一个特殊的名字：Running Execution Context


+	Execution Context
> +		ECMAScript Code Execution Context
>> +		code evaluation state 用于async和generator函数的，保存代码执行位置的信息
>> +		Function
>> +		Script or Module
>> +		Realm 保存我们所有使用的内置对象的一个领域
>> +		LexicalEnvironment 代表了执行代码中所需要访问的环境
>> +		VariableEnvironment 决定了用var声明变量，会声明到哪的一个环境
> +		Generator Execution Contexts
>> +		code evaluation state
>> +		Function
>> +		Script or Module
>> +		Realm 
>> +		LexicalEnvironment
>> +		VariableEnvironment
>> +		Generator Generator函数每次执行所生成的隐藏在背后的Generator。只有Generator函数创建的执行上下文会有Generator字段

+	LexicalEnvironment
> +		this
> +		new.target
> +		super
> +		变量


+	VariableEnvironment

    是个历史遗留的包袱，仅仅用于处理var声明。


+	Environment Records家族
> +		Declarative Environment Records
>> +		FunctionEnvironment Records
>> +		module Environment Records
> +		Global Environment Records
> +		Object Environment Records


+	Function Closure

		在JavaScript中，每一个函数都会生成一个闭包
		
		闭包分为两部分：代码部分、环境部分（object、变量序列）
		
		在JavaScript中，每一个函数都会带一个它定义时所在的Environment Records，它会把Environment Records保存到自己的函数对象身上，变成一个属性

+	Realm
		在一个JavaScript引擎的实例里面，它所有的内置对象会被放进一个Realm里面去
		
        Realm会根据一些外部条件去创建，不同的Realm实例之间也可以互相传递对象
		   
        在JS中，函数表达式和对象直接量均会创建对象
		
        使用.做隐式转换也会创建对象
		
        这些对象也是有原型的，如果我们没有Realm，就不知道它们的原型是什么









