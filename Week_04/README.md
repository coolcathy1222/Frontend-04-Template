#学习笔记#
```语言通识
	泛用语言分类方法
		按语法分类
			形式语言
				乔姆斯基谱系
					0- 型文法（无限制文法或短语结构文法）包括所有的文法
					1- 型文法（上下文相关文法）生成上下文相关语言
					2- 型文法（上下文无关文法）生成上下文无关语言
					3- 型文法（正规文法）生成正则语言
			非形式语言
	产生式（BNF）
		定义
		应用：描述四则运算、通过产生式理解乔姆斯基谱系
		其他产生式
	现代语言的特例
	现代语言的分类
		形式语言-用途
			数据描述语言
				一种允许产生新的描述方案和描述符的语言
				JSON HTML XAML SQL CSS SGML XML
			编程语言
				一种计算机和人都能识别的语言
				C C++ Java C# Python Ruby Perl Lisp T-SQL Clojure Haskell JavaScript
		形式语言-表达方式
			声明式语言
				只描述结果
				JSON HTML XAML SQL CSS Lisp Clojure Haskell
			命令型语言
				描述达成结果需要的步骤
				C C++ Java C# Python Ruby Perl JavaScript
	编程语言的性质
		图灵完备性
			命令式——图灵机
				goto
				if和while
			声明式——lambda
				递归
		动态与静态
			动态
				在用户的设备/在线服务器上
				产品实际运行时
				Runtime
			静态
				在程序眼的设备上
				产品开发时
				Compiletime
		类型系统
			动态类型系统与静态类型系统
			强类型与弱类型
			复合类型
				结构体
				函数签名
			子类型
			泛型
				逆变/协变
		一般命令式编程语言的设计方式
			5个结构层级
				Atom
				Expression
				Statement
				Structrue
				Program
			语法、语义、运行时
JS类型
	Atom
		Grammar
			Literal
			Variable
			Keywords
			Whitespace
			LineTerminiter
		Runtime
			Types
			Execution Context
	Types
		Number
			IEEE 754 Double Float
				Sign (1)
				Exponent (11)
				Fraction (52)
			Grammar
				0.
				0b111
				0o10
				0xFF
		String
			Character
			Code Point
			Encoding
				ASCII
				Unicode
				UCS
				GB
					GB2312
					GBK(GB13000)
					GB18030
				ISO-8859
				BIG5
			Grammar
				"abc"
				'abc'
				`abc${x}`
		Boolean
		Object
			特性
				状态描述对象
				状态的改变就是行为
				任何一个对象都是唯一的，与其本身状态无关，状态完全一致的两个对象也并不相等
			三要素
				id
				状态
				行为
			Class
				归类 多继承
				分类 单继承
			Prototype
				仅需描述自己与原型的区别
			注意
				设计对象的状态和行为是，不应该受到语言描述的干扰，应遵循”行为改变状态“的原则
			JavaScript中的对象
				property
					key Symbol String
					value Data Accessor
				prototype
					原型链
				API/Grammar
					{} . [] Object.defineProperty
					Object.create / Object.setPrototypeOf / Object.getPrototypeOf
					new / class/ extends
				特殊对象
					Function [[call]]
					Array [[length]]
					Object.property [[setPropertyOf]]
					Host Object
		Null
			null为关键字
		Undefined
			undefined是全局变量，可被赋值，安全用法void 0
		Symbol
			唯一
```
