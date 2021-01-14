React理论基础

Chrome-React调试插件https://www.cnblogs.com/shenwh/p/12067029.html
Sublime-React格式化 https://blog.csdn.net/HuangLin_Developer/article/details/89394949
React 是什么？
React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。
当数据发生改变时，React 会高效地更新并重新渲染我们的组件。

在 React 应用中，组件通过 props（“properties” 简写）传递数据，从父组件流向子组件。然后通过 render 方法返回需要展示在屏幕上的视图的层次结构。更具体地来说，render 返回了一个 React 元素。

每一个 React 元素事实上都是一个 JavaScript 对象，可以保存在变量中或者作为参数传递。每个组件都是封装好的，并且可以单独运行，这样你就可以通过组合简单的组件来构建复杂的 UI 界面。

React从一开始就被设计为逐渐采用，您可以根据需要使用少量的React向现有页面添加一些“少量的交互性”。

最小的React示例
ReactDOM.render(  
    <h1>Hello, world!</h1>,
    document.getElementById('root') 
);
假设在你的HTML文件中有一个
<div id="root"></div>
我们称它为“根”DOM节点，因为它里面的一切都将由React DOM管理。
根DOM节点通常只有一个。但如果您正在将React集成到一个现有的应用程序中，您可能会有尽可能多的孤立根DOM节点。要将React元素渲染到根DOM节点，请将两者都传递给ReactDOM.render():

JSX 
是JavaScript的语法扩展。JSX很像模板语言HTML，但它具有JavaScript的全部功能。在JSX中，可以将任何有效的JavaScript表达式放入花括号中。虽然JSX是完全可选的，但许多人发现它对编写UI代码很有帮助。
使用JSX指定属性 你可以使用引号来指定字符串文字作为属性
由于JSX更接近JavaScript而不是HTML, React DOM使用驼峰式属性命名约定而不是HTML属性名称。
例如，在JSX中class变成了className
const element = <img src={user.avatarUrl}></img>;
const element1 = <h1>Hello, world!</h1>;
const element2 = <h1>Hello, {name}</h1>;
const element3 = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
为了便于阅读，我们将JSX分成多行。虽然这不是必需的，但在执行此操作时，我们也建议将其用圆括号括起来，以避免自动插入分号的陷阱。

编译后，JSX表达式成为常规的JavaScript函数调用，并求值为JavaScript对象。
这意味着你可以在if语句和for循环中使用JSX，将它赋值给变量，接受它作为参数，并从函数中返回它:
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
默认情况下，React DOM在呈现JSX中嵌入的任何值之前都会转义。因此，它确保您永远不能注入任何没有显式地编写在您的应用程序中的东西。所有内容在呈现之前都被转换成字符串。这有助于防止XSS(跨站点脚本攻击)。


React元素
JSX 代码:
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
Babel将JSX编译为React.createElement()调用:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
React.createElement()执行一些检查来帮助你编写无bug的代码，但本质上它创建的对象是这样的:
// 注意:这个结构是简化的
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

这些对象被称为“React元素”。 元素是React应用程序最小的构建块。描述了你想在屏幕上看到的内容。React读取这些对象并使用它们构造DOM并使其保持最新。与浏览器的DOM元素不同，React元素是普通对象，创建成本很低。React DOM负责更新DOM以匹配React元素。

React元素是不可变的。一旦创建了元素，就不能更改它的子元素或属性。元素就像电影中的一帧:它表示某个时间点的UI。React只更新必要的内容。React DOM将该元素及其子元素与前一个元素进行比较，并只应用必要的DOM更新以使DOM达到所需的状态。
更新UI的唯一方法是创建一个新元素，并将其传递给ReactDOM.render()。
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);
它每秒钟都会从setInterval()回调函数中调用ReactDOM.render()。但实际上，大多数React应用程序只调用ReactDOM.render()一次。


React组件
React接受了呈现逻辑与其他UI逻辑天生耦合的事实。React不是通过将标记和逻辑放在单独的文件中来人为地分离技术，而是用称为“组件”的松散耦合单元分离关注点，这些单元包含了标记和逻辑。

组件允许您将UI分解为独立的、可重用的部分，并独立地考虑每个部分。从概念上讲，组件就像JavaScript函数。它们接受任意输入(称为“props”)，并返回React元素。

定义组件最简单的方法是编写一个JavaScript函数:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
这个函数是一个有效的React组件，因为它接受一个带有数据的“props”(代表属性)对象参数，并返回一个React元素。我们称这些组件为“函数组件”，因为它们实际上是JavaScript函数。

你也可以使用ES6类来定义组件:
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单。我们不需要定义一个继承于 React.Component 的类，我们可以定义一个函数，这个函数接收 props 作为参数，然后返回需要渲染的元素。函数组件写起来并不像 类组件那么繁琐，很多组件都可以使用函数组件来写。

props
当React看到表示用户定义组件的元素时，它将JSX属性和子组件作为单个对象传递给该组件。我们称这个物体为“props”。
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
props是只读的。无论您将组件声明为函数还是类，它都绝不能修改自己的props。
React非常灵活，但它有一个严格的规则:
所有React组件就它们的props而言必须像纯函数一样。不试图改变它们的输入，并且对于相同的输入总是返回相同的结果。
在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。



state
state允许React组件随时间改变其输出，以响应用户操作、网络响应和其他任何事情。
state是私有的，完全由组件控制。
props(“属性”的缩写)和state都是纯JavaScript对象。尽管它们都保存着影响渲染输出的信息，但它们在一个重要方面是不同的:props传递给组件(类似于函数参数)，而状态是在组件中管理的(类似于函数中声明的变量)。

关于State，有三件事您应该知道
1不直接修改状态 而要使用setState()。你唯一能直接设置State的地方是构造函数。
2状态更新可以是异步的 为了提高性能，React可以将多个setState()调用批处理为一个更新。
因为props和state可以异步更新，所以不应该依赖它们的值来计算下一个state。要解决这个问题，可以使用第二种形式的setState()，它接受函数而不是对象。该函数将接收前一个状态作为第一个参数，应用更新时的props作为第二个参数:
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
3状态更新是以合并的方式
当您调用setState()时，React将您提供的对象合并到当前状态。你的状态可能包含几个独立变量:他们相互之间独立分离，同一个变量会被覆盖


单向数据流
在React应用中，组件是有状态还是无状态被认为是组件的实现细节，父组件和子组件都不能知道某个组件是有状态的还是无状态的，它们也不应该关心它是定义为函数还是类。
这就是为什么状态经常被称为局部的或封装的原因。除了拥有和设置它的组件外，其他组件都不能访问它。
一个组件可以选择把它的状态作为props传递给它的子组件，子组件将在它的props中接收数据，而不知道它是来自父组件的状态，还是props，或是手动输入的，这通常称为“自顶向下”或“单向”数据流。
任何状态总是由某些特定的组件拥有，从该状态派生的任何数据或UI只能影响树中它们“下面”的组件。
如果你把组件树想象成一个props瀑布，那么每个组件的状态就像一个额外的水源，它在任意点与之连接，但也向下流动。
React的单向数据流(也称为单向绑定)使一切都保持模块化和快速。


事件绑定
使用React元素处理事件与处理DOM元素上的事件非常相似。这里有一些语法差异:
1React事件使用驼峰大小写命名，而不是小写。
2使用JSX，您将传递一个函数作为事件处理程序，而不是字符串。
另一个区别是，您不能返回false来防止React中的默认行为。必须显式调用preventDefault。

React根据W3C规范定义了这些合成事件，所以您不需要担心跨浏览器的兼容性。React事件的工作方式与本机事件并不完全相同。
使用React时，通常不需要调用addEventListener在创建DOM元素后向其添加监听器。相反，只需在元素最初呈现时提供一个侦听器。
当您使用ES6类定义组件时，常见的模式是将事件处理程序作为类上的方法。
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
return的内容用()包裹，防止JavaScript 解析的时在 return 的后面自动插入一个分号从而破坏代码结构。
在JavaScript中，类方法默认情况下是不绑定的。如果你忘了绑this.handleClick并将其传递给onClick，当函数被实际调用时，这将是未定义的。
这不是特定反应行为;这是JavaScript中函数工作方式的一部分。通常，如果你引用的方法后面没有()，比如onClick={this.handleClick}，你应该绑定那个方法。
如果调用bind让您感到烦恼，有两种方法可以解决这个问题。如果你正在使用实验性的公共类字段语法，你可以使用类字段来正确地绑定回调函数
如果你没有使用类字段语法，你可以在回调函数中使用箭头函数。这种语法的问题是，每次呈现时都会创建一个不同的回调函数。在大多数情况下，这是可以的。然而，如果这个回调被作为一个props传递给较低的组件，这些组件可能会做额外的重新渲染。我们通常建议在构造函数中绑定或使用类字段语法，以避免这类性能问题。

在循环中，通常希望向事件处理程序传递额外的参数。例如，如果id代表一个行标识，以下两种写法都可以：
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
在这两种情况下，表示React事件的e参数将作为ID之后的第二个参数传递。
对于箭头函数，我们必须显式传递它，但对于bind，任何进一步的参数都会自动转发。

条件渲染
虽然声明一个变量并使用if语句是有条件地呈现组件的好方法，但有时您可能希望使用更短的语法。有几种方法可以在JSX中内联条件，可以通过用花括号将表达式包装起来，将表达式嵌入到JSX中。这包括JavaScript的逻辑&&操作符。对于有条件地包含元素，它可以很方便。
它能起作用是因为在JavaScript中，true && expression总是计算为expression, false && expression总是计算为false。因此，如果条件为真，那么&&之后的元素将出现在输出中。如果它是假的，React会忽略并跳过它。
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);


render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
当条件变得太复杂时，可能是提取组件的好时机。
在极少数情况下，您可能希望一个组件隐藏自己，即使它是由另一个组件呈现的。要做到这一点，返回null而不是它的渲染输出。从组件的render方法返回null不会影响组件生命周期方法的触发。例如componentDidUpdate仍然会被调用。
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

列表元素的key
key是创建元素列表时需要包含的特殊字符串属性，它是 React 中一个特殊的保留属性（还有一个是 ref，拥有更高级的特性）。当 React 元素被创建出来的时候，React 会提取出 key 属性，然后把 key 直接存储在返回的元素上。 key帮助React识别哪些项目被更改、添加或删除来自动判断哪些组件需要更新。有利于在列表头部插入新节点时提高效率。选择key的最佳方法是使用在其兄弟列表中唯一标识列表项的字符串。大多数情况下，你会使用数据中的id作为key。当你没有稳定的id渲染项目，你可以使用项目索引，如果项目的顺序可能会改变，我们不建议使用索引。这可能会对性能产生负面影响，并可能导致组件状态出现问题。如果你没有指定任何 key，React 会发出警告，并且会把索引当作默认的 key。显式地使用 key={i} 来指定 key 确实会消除警告，但是如果想要对列表进行重新排序、新增、删除操作时，把数组索引作为 key 依然是有问题的。所以大多数情况下最好不要这么做。组件不能访问到它的 key 。同时key也不会传递即子组件无法通过props.key访问到，虽然 key 看起来好像是 props 中的一个，当需要使用key值时要单独传递新属性。

何时需要key？构建动态列表的时候。一个好的经验法则是map()调用中的元素需要key。key要在同级元素间唯一，不需要全局唯一。key应该是稳定的、可预测的和惟一的。不建议使用索引，在发生顺序变化时可能引发意料外的渲染，不建议使用随机数，这可能导致性能下降和在子组件中丢失状态。
如果map()主体嵌套太深，现在可能是提取组件的好时机。

function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}


状态提升
在React中，共享状态是通过将其移动到需要它的组件的最近的公共祖先来实现的。这被称为“状态提升”。 
通常，状态首先被添加到需要它来呈现的组件中。然后，如果其他组件也需要它，您可以将它提升到它们最近的共同祖先。您应该依赖自顶向下的数据流，而不是尝试在不同组件之间同步状态。
与双向绑定方法相比，提升状态需要编写更多的“样板”代码，但作为一个好处，它需要更少的工作来发现和隔离bug。因为任何状态都“存在”于某些组件中，而该组件本身就可以改变它，所以漏洞的表面积就大大减少了。此外，您可以实现任何自定义逻辑来拒绝或转换用户输入。 
当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。像这种将组件的 state 提升到父组件的情形在重构 React 组件时经常会遇到。 
我们知道props是只读的。当state 提升到父组件时，就不可以调用this.setState()来更改它了。
在React中，这通常是通过让组件“受控”来解决的。
“受控组件” 对于受控组件，输入值总是由React state驱动。


React思维
步骤1:将UI分解为组件层次结构
单一职责原则，也就是说，一个组件在理想情况下应该只做一件事。如果它最终增长，它应该被分解成更小的子组件。每个组件匹配数据模型的一个部分

步骤2:在React中构建静态版本
要构建一个渲染数据模型的应用程序静态版本，你需要构建重用其他组件并使用props传递数据的组件。props是一种将数据从父类传递到子类的方法。如果您熟悉状态的概念，那么完全不要使用状态来构建这个静态版本。状态仅用于交互，即随时间变化的数据。因为这是应用程序的静态版本，所以不需要它。

在这一步的最后，您将拥有一个可重用的组件库来呈现数据模型。组件将只有render()方法，因为这是你的应用程序的静态版本。React的单向数据流(也称为单向绑定)使一切都变得模块化和快速。要使UI具有交互性，您需要能够触发对底层数据模型的更改。React用state实现这一点。

步骤3:确定UI状态的最小(但完整)表示
它是通过props从父级传递进来的吗?如果是这样，它可能不是state。
它会随时间保持不变吗?如果是这样，它可能不是state。
你能根据组件中的其他状态或props来计算吗?如果是这样，它就不是state。

步骤4:确定React哪个组件拥有state
识别每个基于那个状态呈现东西的组件。
找到一个公共所有者组件(在层次结构中需要该状态的所有组件之上的一个组件)。
公共所有者或其他更高层次的组成部分应该拥有state。
如果找不到可以拥有状态的组件，可以创建一个新的组件来保存状态，并将其添加到公共所有者组件之上的某个层次结构中。

步骤5:添加反向数据流
层次结构深处的表单组件更新更高层次的组件的state。 

为什么不可变性在 React 中非常重要
一般来说，有两种改变数据的方式。第一种方式是直接修改变量的值，第二种方式是使用新的一份数据替换旧数据。两者结果是一样的，但后者有以下几点好处：

不可变性使得复杂的特性更容易实现。不直接在数据上修改可以让我们保存每次修改前的数据副本，从而追溯并复用历史记录，实现撤销和恢复。

不可变性使得跟踪数据变化更容易。如果发现对象变成了一个新对象，那么我们就知道对象发生了改变。而不需要将整个对象树遍历一次。

不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以由此确定组件重新渲染的时机。


懒加载lazy
React.lazy函数允许将动态导入呈现为常规组件。
Before:
import OtherComponent from './OtherComponent';
After:
const OtherComponent = React.lazy(() => import('./OtherComponent'));
当这个组件第一次被渲染时，它会自动加载包含OtherComponent的bundle。
React.lazy接受一个必须调用动态import()的函数。这必须返回一个Promise，它会解析为一个带有包含React组件的默认导出的模块。
然后，惰性组件应该在悬空组件中呈现，这允许我们在等待惰性组件加载时显示一些后备内容(比如加载指示器)。
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
下面是一个如何使用React Router和React.lazy等库在应用中设置基于路由的代码分割的例子。
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);


上下文context
提供了一种通过组件树传递数据的方法，而不必在每个级别手动传递props。
在一个典型的React应用程序中，数据是通过props自顶向下传递的(父元素到子元素)，但是对于应用程序中许多组件都需要的特定类型的props(例如locale preference、UI theme)来说，这可能会很麻烦。Context提供了一种在组件之间共享这些值的方法，而不必在树的每一层都显式地传递一个props。
当某些数据需要由不同嵌套级别的许多组件访问时，主要使用上下文。谨慎地应用它，因为它使组件重用更加困难。上下文允许您将此类数据及其更改“广播”给下面的所有组件。使用上下文可能比其他方法更简单的常见示例包括管理当前语言环境、主题或数据缓存。
如果您只是想避免在许多级别传递一些props，那么组件组合通常是比上下文更简单的解决方案。
将子组件作为props传递，也可用此模式将子节点与其直接父节点解耦

错误边界
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
工作原理类似于JavaScript catch{}块，但它用于组件。只有类组件可以是错误边界。
错误边界只捕获树中它们下面的组件中的错误。错误边界不能捕获自身内部的错误。如果错误边界无法呈现错误消息，则错误将传播到它上面最近的错误边界。这也类似于JavaScript中的catch{}块的工作方式。
错误边界的粒度由您决定。您可以包装顶级路由组件以向用户显示“出错了”消息，就像服务器端框架经常处理崩溃一样。您还可以将单个小部件包装在一个错误边界中，以保护它们不会崩溃应用程序的其余部分。
错误边界不捕捉事件处理程序内部的错误。React不需要从事件处理程序中的错误中恢复错误边界。与呈现方法和生命周期方法不同，事件处理程序不会在呈现期间发生。所以如果他们抛出异常了，React仍然知道在屏幕上显示什么。如果你需要捕获事件处理程序内部的错误，使用常规的JavaScript try / catch语句:
try / catch很棒，但它只适用于命令式代码: 然而，React组件是声明式的，并指定应该呈现的内容:


Forwarding Refs
一种通过组件自动将Ref传递给其子组件的技术。对于应用程序中的大多数组件来说，这通常是不必要的。但是，它对某些类型的组件很有用，特别是在可重用组件库中。
Refs提供了一种访问DOM节点或对render方法中创建的元素做出反应的方法。
在典型的React数据流中，props是父组件与子组件交互的唯一方式。要修改一个孩子，你需要用新的props重新渲染它。但是，在一些情况下，您需要在典型数据流之外强制修改子流。要修改的子元素可以是React组件的实例，也可以是DOM元素。对于这两种情况，React提供了一个逃生口。

这里有一些很好的参考用例:
	管理焦点、文本选择或媒体播放。
	触发命令动画。
	与第三方DOM库集成。


Higher-Order Components (HOC)
一种组合模式 提取出可重用行为减少代码量 一个方法接收组件参数返回新的带有可重用行为的组件 注意静态方法要复制 refs无法重用 如果向HOC添加ref, ref将引用最外层的容器组件，而不是被包装的组件。幸运的是，我们可以使用React.forwardRef API显式地将refs转发到内部组件。

Render Props 
一个提供方法的prop 提高渲染效率 行为具有相关性 可以使用带有Render Prop的常规组件来实现大多数的HOC。 render可以换个名字
<Mouse render={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>

this.props.render(this.state) 并不是在组件中修改了props，而是将参数传给props.render   

注意在React.PureComponent中使用Render Props要小心
使用Render Prop会抵消使用React.PureComponent带来的优势如果在render()中创建方法。这是因为对于新的prop，浅prop比较总是返回false，并且在这种情况下，每次渲染都会为Render Prop生成一个新的值。  这时可以将render prop定义为一个实例方法 提出到render()之外

生命周期
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
React允许您将组件定义为类或函数。定义为类的组件目前提供更多的特性，在本页中将详细描述。要定义React组件类，你需要扩展React. component
我们强烈建议不要创建自己的基组件类。在React组件中，代码重用主要是通过组合而不是继承来实现的。
每个组件都有几个“生命周期方法”，您可以覆盖这些方法，以便在流程中的特定时间运行代码。

Mounting
当组件的实例被创建并插入到DOM中时，这些方法会按照以下顺序被调用:
constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

Updating
props或状态的更改可以导致更新。当组件被重新渲染时，这些方法被按照以下顺序调用:
static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

Unmounting
当组件被从DOM中移除时，这个方法会被调用:
componentWillUnmount()

Error Handling
当呈现过程中、生命周期方法中或任何子组件的构造函数中出现错误时，将调用这些方法。
static getDerivedStateFromError()
componentDidCatch()

常用的生命周期方法：
render()
render()方法是类组件中唯一需要的方法。
当被调用时，它应该检查这个。props和。状态并返回以下类型之一:
React元素。通常通过JSX创建。
数组和碎片。让你从渲染中返回多个元素。
门户网站(Portals)。让您将子节点呈现到不同的DOM子树中。有关更多细节，请参阅门户上的文档。
字符串和数字。它们在DOM中呈现为文本节点。
布尔值或null。什么都不渲染。(主要存在于条件渲染)

render()函数应该是纯的，这意味着它不修改组件状态，每次调用它都会返回相同的结果，并且它不直接与浏览器交互。如果需要与浏览器交互，在componentDidMount()或其他生命周期方法中执行操作。
如果shouldComponentUpdate()返回false，则不会调用render()。

constructor (props)
如果你不初始化状态，也不绑定方法，你就不需要为React组件实现构造函数。
React组件的构造函数在它被挂载之前被调用。在实现React的构造函数时。组件子类，您应该在任何其他语句之前调用super(props)。否则,this.props将在构造函数中未定义，这可能会导致bug。
通常，在React中构造函数只用于两个目的:
通过将一个对象赋值给this.state来初始化本地状态。
将事件处理程序方法绑定到实例。

不应该在构造函数()中调用setState()。构造函数是唯一应该直接赋值this.state的地方。在所有其他方法中，您需要使用this.setState()代替。
避免在构造函数中引入任何”effect”或订阅。对于这些用例，请使用componentDidMount()。
避免复制props中的值进入状态!这是一个常见的错误: 问题是它既没有必要(你可以用this.props.xxx直接代替)，并产生bug(对props的更新不会反映在状态中)。只有在你有意忽略props更新时才使用这个模式，然后在必要时更改组件的键来强制“重置”组件的内部状态。


componentDidMount()
组件被挂载(插入到树中)后立即调用componentDidMount()。需要DOM节点的初始化应该在这里进行。如果您需要从远程端点加载数据，这是一个实例化网络请求的好地方。
这个方法是建立任何订阅的好地方。如果您这样做了，不要忘记在componentWillUnmount()中取消订阅。
你可以在componentDidMount()中立即调用setState()。它将触发一个额外的rendering，但它将发生在浏览器更新屏幕之前。这保证了即使render()在这种情况下被调用两次，用户也不会看到中间状态。请谨慎使用此模式，因为它经常会导致性能问题。在大多数情况下，您应该能够在构造函数()中指定初始状态。然而，当您需要在渲染依赖于如模态和工具提示的大小或位置的东西之前测量DOM节点时，它可能是必要的。

componentDidUpdate(prevProps, prevState, snapshot)
在更新发生后立即调用。初始呈现时不调用此方法。
当组件被更新时，可以利用这个机会对DOM进行操作。这也是进行网络请求的好地方，只要您将当前的Props与以前的Props进行比较(如果Props没有更改，则可能不需要网络请求)。
你可以在componentDidUpdate()中立即调用setState()，但请注意，它必须被包装在一个条件中，否则会导致无限循环。它还会导致额外的重新呈现，虽然对用户不可见，但会影响组件的性能。如果你试图“镜像”一些状态到Props，考虑直接使用Props。
如果你的组件实现了getSnapshotBeforeUpdate()生命周期(这是很少见的)，它返回的值将作为第三个“快照”参数传递给componentDidUpdate()。否则这个参数将是未定义的。
如果shouldComponentUpdate()返回false，将不会调用componentDidUpdate()。

componentWillUnmount()
componentWillUnmount()会在组件被卸载和销毁之前立即调用。在此方法中执行必要的清理，例如使计时器失效、取消网络请求或清理在componentDidMount()中创建的订阅。
你不应该在componentWillUnmount()中调用setState()，因为组件永远不会被重新渲染。组件实例一旦被卸载，就再也不会被挂载了。


很少使用的生命周期方法：大多数组件可能不需要它们。
shouldComponentUpdate(nextProps, nextState)
使用shouldComponentUpdate()让React知道组件的输出是否不受当前状态或Props的变化影响。默认行为是在每次状态更改时重新呈现，在绝大多数情况下，您应该依赖默认行为。
当接收到新的Props或状态时，会在rendering之前调用shouldComponentUpdate()。默认值为true。初始渲染或使用forceUpdate()时不调用此方法。
此方法仅作为性能优化而存在。不要依赖它来“阻止”渲染，因为这可能导致bug。考虑使用内置的PureComponent，而不是手工编写shouldComponentUpdate()。PureComponent执行Props和状态的简单比较，减少了您跳过必要更新。
如果你确信你想手写，你可以比较一下this.props与nextProps，this.state与nextState，返回false告诉React可以跳过更新。注意，返回false并不会阻止子组件在状态改变时重新呈现。
我们不建议做深度的相等性检查或在shouldComponentUpdate()中使用JSON.stringify()。这是非常低效的，并将损害性能。
目前，如果shouldComponentUpdate()返回false，则不会调用UNSAFE_componentWillUpdate()(一个遗留的生命周期方法)、render()和componentDidUpdate()。将来React可能会把shouldComponentUpdate()当作一个提示而不是一个严格的指令，并且返回false仍然可能导致组件的重新呈现。

static getDerivedStateFromProps(props, state)
在render()之前被调用，在初始挂载和后续更新时都是如此。它应该返回一个对象来更新状态，或者返回null来不更新任何内容。
这种方法适用于状态依赖于props随时间变化的少数情况。
派生状态会导致冗长的代码，并使您的组件难以思考。确保你熟悉简单的替代方案:
如果你需要执行一个”effect”(例如，数据获取或动画)来响应props的变化，使用componentDidUpdate生命周期代替。
如果你想在props发生变化时重新计算一些数据，可以使用记忆辅助工具。
如果你想在props改变时“重置”某些状态，可以考虑使用带key的完全控制或完全不受控制的组件。
此方法不能访问组件实例。如果想，可以在getDerivedStateFromProps()和其他类方法之间重用一些代码：在类定义之外提取组件props和状态的纯函数。
注意这个方法在每次render时都会被触发。这与UNSAFE_componentWillReceiveProps(一个遗留的生命周期方法)相反，UNSAFE_componentWillReceiveProps只在父组件导致重渲染时触发，而不会因为本地setState触发。

getSnapshotBeforeUpdate(prevProps, prevState)
getSnapshotBeforeUpdate()在最近渲染的输出提交给DOM之前被调用。它使你的组件能够在它可能被更改之前从DOM捕获一些信息(例如滚动位置)。这个生命周期返回的任何值都将作为参数传递给componentDidUpdate()。
这个用例并不常见，但它可能出现在用户界面中，比如需要以一种特殊的方式处理滚动位置的聊天线程。
应该返回一个快照值(snapshot)或null。有时读取getSnapshotBeforeUpdate中的scrollHeight属性是很重要的，因为在“渲染”阶段生命周期(像render)和“提交”阶段生命周期(像getSnapshotBeforeUpdate和componentDidUpdate)之间可能存在延迟。

Error boundaries(错误边界)
错误边界是React组件，它在子组件树的任何地方捕捉JavaScript错误，记录这些错误，并显示一个后备UI，而不是崩溃的组件树。错误边界捕获在rendering过程中、生命周期方法中以及在它下面的整个树的构造函数中出现的错误。
如果类组件定义了生命周期方法static getDerivedStateFromError()或componentDidCatch()中的一个(或两个)，它就会成为错误边界。从这些生命周期中更新状态使您可以在下面的树中捕获未处理的JavaScript错误，并显示退阶UI。
仅在从意外异常中恢复时使用错误边界;不要试图将它们用于控制流。
错误边界只捕获树中它们下面的组件中的错误。错误边界不能捕获自身的错误。

static getDerivedStateFromError(error)
这个生命周期是在后代组件抛出错误后调用的。它接收作为参数抛出的错误，并返回值更新状态。
getDerivedStateFromError()在“渲染”阶段被调用，因此”effect”未生效的。对于这些用例，请使用componentDidCatch()。

componentDidCatch(error, info)
这个生命周期是在后代组件抛出错误后调用的。它接收两个参数:
error—抛出的错误。
info —一个带有componentStack键的对象，其中包含关于哪个组件抛出错误的信息。
componentDidCatch()在“提交”阶段被调用，因此”effect”是生效的。它应该用于记录错误。
React的生产版本和开发版本在componentDidCatch()处理错误的方式上略有不同。
在开发时，错误会冒泡到window，这意味着window.onerror或window.addEventListener('error'， callback)将拦截componentDidCatch()捕获的错误。
相反，在生产环境中，错误不会冒出来，这意味着任何祖先错误处理程序将只接收componentDidCatch()未显式捕获的错误。
在出现错误的情况下，您可以通过调用setState来使用componentDidCatch()渲染退阶UI，但这将在未来的版本中弃用。使用静态的getDerivedStateFromError()来处理回退渲染。


Hooks
React 16.8 新增hook让您不用编写类就可以使用state和其他React特性。
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

hooks是完全可选的。您可以在几个组件中尝试挂钩，而无需重写任何现有代码。或者不使用它。
hooks不包含任何破坏更改，100%的向后兼容。
hooks不能取代你对React概念的认识。相反，它为React概念(props、状态、上下文、引用和生命周期)提供了更直接的API。hook还提供了一种新的强大的方式来组合它们。


什么是Hooks？ 
Hooks是一种特殊的函数，它可以让你从函数组件“钩入”React状态和生命周期特性。例如，useState是一个Hooks，它允许您向功能组件添加状态。Hooks不能在类内部工作。但是您可以使用它们来代替编写类。

我什么时候用Hooks?如果您编写了一个函数组件，并且意识到需要向其添加一些状态，那么以前您必须将其转换为一个类。现在您可以在现有的函数组件中使用一个Hooks。
React提供了一些内置的Hooks，比如useState。您还可以创建自己的Hooks来重用不同组件之间的有状态行为。

为什么会出现Hooks？
1. 很难在组件之间重用有状态逻辑：React没有提供将可重用行为添加到组件的方法
可以通过render props 和HOC尝试解决这个问题，但这要求重构代码。你可能会发现组件的“包装地狱”，由提供者providers、使用者,consumers、高阶组件HOC、渲染propsrender props和其他抽象层包围。
所以React需要一个更好的原语来共享有状态逻辑。通过使用Hooks，可以从组件中提取有状态逻辑，以便能够独立地测试和重用它。
2. 复杂的组件变得难以理解：我们经常不得不维护一些组件，这些组件一开始很简单，但后来发展成一团混乱的有状态逻辑和”effect”。每个生命周期方法通常都包含一些不相关的逻辑。这很容易引入错误和不一致。
在许多情况下，不可能将这些组件分解成更小的组件，因为到处都是有状态逻辑。测试它们也很困难。这也是许多人喜欢将React与单独的状态管理库结合使用的原因之一。然而，这通常会引入太多的抽象，要求您在不同的文件之间跳转，并使重用组件变得更加困难。
为了解决这个问题，Hooks允许您根据相关的部分(如设置订阅或获取数据)将一个组件拆分为更小的函数，而不是根据生命周期方法强制拆分。您还可以选择使用reducer来管理组件的本地状态，以使其更可预测。
3. 类让人和机器困惑：除了使代码重用和代码组织更加困难之外，我们还发现类是学习React的一大障碍。
您必须了解this在JavaScript中是如何工作的，这与在大多数语言中是非常不同的。人们可以很好地理解props、状态和自顶向下的数据流，但仍然很难理解类。类不能很好地缩小，它们使得热重新加载不稳定且不可靠。
为了解决这些问题，Hooks允许你在不使用类的情况下使用更多React的特性。从概念上讲，React组件一直更接近于函数。Hooks拥抱了函数，但没有牺牲React的实用精神。Hooks提供了对命令式出口的访问，并且不需要您学习复杂的函数式或响应式编程技术。


State Hook
React提供的一个名为useState的Hook。我们在函数组件中调用它添加一些状态。
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
useState的唯一参数是初始状态。在上面的例子中，它是0，因为我们的计数器从0开始。注意，与this.state不同，这里的状态不一定是一个对象。初始状态参数只在第一次呈现时使用。
useState有一对返回值:当前状态值和一个允许您更新它的函数。您可以从事件处理程序或其他地方调用此函数。它和类中的this.setState类似，但它不合并旧状态和新状态而是直接覆盖。
你可以在单个组件中多次使用useState。
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
方括号是什么意思?
你可能已经注意到方括号，这种JavaScript语法称为“数组解构”。
比如const [fruit, setFruit] = useState('banana');
这意味着我们创建了两个新变量fruit和setFruit，其中fruit被设置为useState返回的第一个值，setFruit是第二个。你也可以这样写，但使用[0]和[1]来访问有点令人困惑：
var fruitStateVariable = useState('banana'); // Returns a pair
var fruit = fruitStateVariable[0]; // First item in a pair
var setFruit = fruitStateVariable[1]; // Second item in a pair
调用useState时做了什么?它声明一个“状态变量”。 通常，当函数退出时，变量“消失”，但状态变量被React保留。
把什么作为参数传递给useState?useState()Hook的唯一参数是初始状态。与类不同，这里的状态不必是一个对象。如果我们想在状态中存储两个不同的值，我们将调用两次useState()。
useState返回什么?它返回两个值:当前状态和一个更新状态的函数。

你可能想知道:为什么useState不命名为createState ?
“Create”不是很准确，因为状态只在第一次渲染时创建。在接下来的渲染中，useState会给我们当前状态。

读状态和更新状态在类组件和函数组件中的区别
<p>You clicked {this.state.count} times</p>
vs
<p>You clicked {count} times</p>

<button onClick={() => this.setState({ count: this.state.count + 1 })}>
  Click me
</button>
vs
<button onClick={() => setCount(count + 1)}>
  Click me
</button>



Effect Hook
您可能已经执行过数据获取、订阅或从React组件手动更改DOM。我们称这些操作为““effect””(或简称为“效果”)，因为它们会影响其他组件，在呈现过程中不能执行。
效果挂钩useEffect添加了从函数组件执行”effect”的能力。它的作用与React类中的componentDidMount、componentDidUpdate和componentWillUnmount相同，但被统一到一个API中。
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
当您调用useEffect时，您是在告诉React在刷新DOM更改后运行“effect”函数。效果是在组件内部声明的，因此它们可以访问组件的props和状态。默认情况下，React会在每次渲染后运行效果——包括第一次渲染。
效果还可以通过返回一个函数来指定如何在它们之后进行“清理”。例如，这个组件使用一种效果来订阅一个朋友的在线状态，然后通过取消订阅来清除:

import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
在这个例子中，当组件卸载时，React将取消订阅我们的ChatAPI，以及由于后续渲染而重新运行效果之前。如果我们传递给ChatAPI的props.friend.id没有改变，你希望告诉React跳过重新订阅，那么将一个数组作为第二个可选参数传递给useEffect:
useEffect(() => {
  ...
}, [props.friend.id]); // Only re-run the effect if props.friend.id changes
就像useState一样，你可以在一个组件中使用多个效果:
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
Effect Hook允许您根据组件中相关的部分(比如添加和删除订阅)来组织”effect”，而不是根据生命周期方法强制进行分割。

Effect Hook让你在函数组件中执行”effect”(或 “效果”)，在React组件中获取数据、设置订阅和手动更改DOM都是”effect”的例子。调用useEffect时，您是在告诉React在刷新DOM的更改后运行“effect”函数。默认情况下，React会在每次渲染之后运行“effect”——包括第一次渲染。
Hooks允许您根据相关的部分(如添加和删除订阅)来组织组件中的”effect”，而不是强制基于生命周期方法进行拆分，它允许您在组件中执行”effect”，并且类似于类中的生命周期方法
如果您熟悉React类生命周期方法，您可以将useEffectHooks看作是componentDidMount、componentDidUpdate和componentWillUnmount的组合。
React组件有两种常见的”effect”:不需要清理的”effect”和需要清理的”effect”。
有时，我们希望在React更新了DOM之后运行一些额外的代码。网络请求、手动DOM突变和日志记录是不需要清理的常见效果示例。
在React类组件中，render方法本身不应该造成”effect”。因为这里还为时过早——我们通常希望在React更新了DOM之后再执行效果。这就是为什么在React类中，我们将”effect”放到componentDidMount和componentDidUpdate中。请注意，我们必须在类中的这两个生命周期方法之间复制代码。忘记正确处理componentDidUpdate是React应用程序常见的bug来源。可能导致内存泄漏或崩溃。
这是因为在许多情况下，我们希望执行相同的”effect”，而不管组件是刚刚挂载还是之后已经完成更新。从概念上讲，我们希望它在每次呈现之后发生——但是React类组件没有这样的方法。
Effect Hook是做什么的?通过使用这个Hooks，你告诉React你的组件需要在渲染之后做一些事情。React将记住您传递的函数(我们将把它称为“效果”或”effect”)，并在执行DOM更新之后调用它。useEffect在默认情况下处理它们。在应用下一个效果之前，它会清除之前的效果。
为什么在组件内部调用useEffect ?将useEffect放在组件中，我们可以直接从该效果访问状态变量(或任何prop)。我们不需要一个特殊的API来读取它——它已经在函数作用域中了。Hooks包含了JavaScript闭包，并避免引入JavaScript已经提供解决方案的React-specific APIs。
是否每次渲染后都会运行useEffect ?是的!默认情况下，它在第一次渲染和每次更新之后运行。这种行为在默认情况下确保了一致性，并防止了由于缺少更新逻辑而在类组件中常见的bug。
与componentDidMount或componentDidUpdate不同，使用useEffect的效果不会阻止浏览器更新屏幕。这让你的应用程序感觉响应更快。大多数效果不需要同步发生。在不常见的情况下(比如测量布局)，有一个单独的useLayoutEffectHooks，其API与useEffect相同。

对比类与Hooks不需要清理的”effect”。
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}


import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

对比类与Hooks需要清理的”effect”。

在React类中，你通常会在componentDidMount中设置订阅，然后在componentWillUnmount中清除订阅。

class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
注意componentDidMount和componentWillUnmount是如何相互镜像的。生命周期方法迫使我们分割这个逻辑，即使它们中的代码在概念上与相同的效果相关。相比之下useEffect被设计成将其保持在一起。
为什么我们从效果返回一个函数?这是可选的效果清理机制。每个效果都可以返回一个在它之后进行清理的函数。这让我们可以将相关的逻辑保持在彼此接近的位置。
React到底什么时候执行清理?React在组件卸载时执行清理。然而，正如我们之前学到的，效果会在每次渲染时运行，而不仅仅是一次。这就是为什么React也会在下次运行效果之前清除之前渲染的效果。这样做有助于避免错误，但在某些情况下，每次渲染后清理或应用效果可能会产生性能问题。在类组件中，我们可以通过在componentDidUpdate中额外写一个与prevProps或prevState的比较来解决这个问题: 
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
这个要求非常普遍，因此它被内置到useEffect钩子API中。如果在重新渲染之间某些值没有改变，你可以告诉React跳过应用效果。为此，将一个数组作为第二个可选参数传递给useEffect:
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
如果数组中有多个项目，即使其中一个项目不同，React也会重新运行效果。
这也适用于有清理阶段的效果:
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
将来，第二个参数可能会通过构建时转换自动添加。

如果您想运行一个效果并只清除一次(在挂载和卸载时)，可以传递一个空数组([])作为第二个参数。这告诉React你的效果不依赖于任何props或状态的值，所以它永远不需要重新运行。

我们也开始看到钩子如何解决动机中列出的问题。我们已经看到了效果清理如何避免componentDidUpdate和componentWillUnmount中的重复，使相关代码更加紧密，并帮助我们避免bug。我们还看到了如何根据效果的目的来区分效果，这是我们在类中根本做不到的。



Hooks是JavaScript函数，但是它们附加了两个规则：
不要在循环、条件或嵌套函数内部调用钩子。相反，总是在React函数的顶层使用钩子。如果想要有条件地运行一个effect，可以将该条件放在钩子中。
不要从常规JavaScript函数中调用Hooks。相反，总是在React函数组件中调用钩子。或从自定义钩子调用钩子。




自定义Hooks
有时，我们希望在组件之间重用一些有状态逻辑。传统上，这个问题有两种流行的解决方案:HOC件和render props。自定义Hooks允许您这样做，但不需要向树中添加更多组件。
前面，我们介绍了一个FriendStatus组件，它调用useState和useEffect钩子来订阅朋友的在线状态。假设我们还想在另一个组件中重用这个订阅逻辑。我们可以将这个逻辑提取到一个名为useFriendStatus的自定义钩子中:
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
useFriendStatus它接受friendID作为参数，并返回我们的朋友是否在线。
我们可以在不同组件中重用这段状态逻辑：
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );

Hooks是重用有状态逻辑的一种方式，而不是状态本身。实际上，对Hooks的每个调用都有一个完全隔离的状态——所以您甚至可以在一个组件中两次使用同一个自定义Hooks。
自定义钩子更像是一种约定，而不是一种特性。如果一个函数的名字以“use”开头，并且它调用了其他Hooks，我们称它为自定义Hooks。

还有一些不太常用的内置Hooks，您可能会发现它们很有用。例如，useContext允许您订阅React上下文而不引入嵌套:
useReducer可以通过一个reducer管理复杂组件的本地状态
构建自己的钩子可以将组件逻辑提取到可重用的函数中。
当我们想要在两个JavaScript函数之间共享逻辑时，我们将其提取到第三个函数中。组件和钩子都是函数，所以这也适用于它们!
自定义钩子是一个JavaScript函数，它的名字以“use”开头，可以调用其他钩子。就像在组件中一样，确保只在自定义钩子的顶层调用其他钩子。
两个组件使用相同的钩子共享状态吗?不。自定义钩子是一种重用有状态逻辑的机制，但每次使用自定义钩子时，它内部的所有状态和效果都是完全隔离的。
