为什么不可变性在 React 中非常重要
一般来说，有两种改变数据的方式。第一种方式是直接修改变量的值，第二种方式是使用新的一份数据替换旧数据。两者结果是一样的，但后者有以下几点好处：

不可变性使得复杂的特性更容易实现。不直接在数据上修改可以让我们保存每次修改前的数据副本，从而追溯并复用历史记录，实现撤销和恢复。

不可变性使得跟踪数据变化更容易。如果发现对象变成了一个新对象，那么我们就知道对象发生了改变。而不需要将整个对象树遍历一次。

不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以由此确定组件重新渲染的时机。

“函数组件”
如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单。我们不需要定义一个继承于 React.Component 的类，我们可以定义一个函数，这个函数接收 props 作为参数，然后返回需要渲染的元素。函数组件写起来并不像 class 组件那么繁琐，很多组件都可以使用函数组件来写。

key 是 React 中一个特殊的保留属性（还有一个是 ref，拥有更高级的特性）。当 React 元素被创建出来的时候，React 会提取出 key 属性，然后把 key 直接存储在返回的元素上。虽然 key 看起来好像是 props 中的一个，但是你不能通过 this.props.key 来获取 key。React 会通过 key 来自动判断哪些组件需要更新。组件是不能访问到它的 key 的。

我们强烈推荐，每次只要你构建动态列表的时候，都要指定一个合适的 key。如果你没有找到一个合适的 key，那么你就需要考虑重新整理你的数据结构了，这样才能有合适的 key。

如果你没有指定任何 key，React 会发出警告，并且会把数组的索引当作默认的 key。但是如果想要对列表进行重新排序、新增、删除操作时，把数组索引作为 key 是有问题的。显式地使用 key={i} 来指定 key 确实会消除警告，但是仍然和数组索引存在同样的问题，所以大多数情况下最好不要这么做。

组件的 key 值并不需要在全局都保证唯一，只需要在当前的同级元素保证唯一即可。

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
所有React组件就它们的道具而言必须像纯函数一样。不试图改变它们的输入，并且对于相同的输入总是返回相同的结果。
在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。



state
state允许React组件随时间改变其输出，以响应用户操作、网络响应和其他任何事情。
state是私有的，完全由组件控制。
props(“属性”的缩写)和state都是纯JavaScript对象。尽管它们都保存着影响渲染输出的信息，但它们在一个重要方面是不同的:道具传递给组件(类似于函数参数)，而状态是在组件中管理的(类似于函数中声明的变量)。

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
一个组件可以选择把它的状态作为道具传递给它的子组件，子组件将在它的props中接收数据，而不知道它是来自父组件的状态，还是props，或是手动输入的，这通常称为“自顶向下”或“单向”数据流。
任何状态总是由某些特定的组件拥有，从该状态派生的任何数据或UI只能影响树中它们“下面”的组件。
如果你把组件树想象成一个道具瀑布，那么每个组件的状态就像一个额外的水源，它在任意点与之连接，但也向下流动。
React的单向数据流(也称为单向绑定)使一切都保持模块化和快速。


生命周期方法
在具有多个组件的应用程序中，在组件被破坏时释放它们占用的资源是非常重要的。
我们可以生命周期方法，以便在组件挂载和卸载时运行一些代码
componentDidMount()方法在组件输出呈现给DOM之后运行。这里是设置计时器的好地方:
我们将在componentWillUnmount()生命周期方法中销毁计时器:
它将使用this.setState()来调度组件本地状态的更新
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

return的内容用()包裹，防止JavaScript 解析的时在 return 的后面自动插入一个分号从而破坏代码结构。


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
在JavaScript中，类方法默认情况下是不绑定的。如果你忘了绑这个。handleClick并将其传递给onClick，当函数被实际调用时，这将是未定义的。
这不是特定反应行为;这是JavaScript中函数工作方式的一部分。通常，如果你引用的方法后面没有()，比如onClick={this.handleClick}，你应该绑定那个方法。
如果调用bind让您感到烦恼，有两种方法可以解决这个问题。如果你正在使用实验性的公共类字段语法，你可以使用类字段来正确地绑定回调函数
如果你没有使用类字段语法，你可以在回调函数中使用箭头函数。这种语法的问题是，每次呈现时都会创建一个不同的回调函数。在大多数情况下，这是可以的。然而，如果这个回调被作为一个道具传递给较低的组件，这些组件可能会做额外的重新渲染。我们通常建议在构造函数中绑定或使用类字段语法，以避免这类性能问题。

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
key是创建元素列表时需要包含的特殊字符串属性。帮助React识别哪些项目被更改、添加或删除。有利于在列表头部插入新节点时提高效率。选择键的最佳方法是使用在其兄弟列表中唯一标识列表项的字符串。大多数情况下，你会使用数据中的id作为key。当你没有稳定的id渲染项目，你可以使用项目索引，如果项目的顺序可能会改变，我们不建议使用索引。这可能会对性能产生负面影响，并可能导致组件状态出现问题。如果您选择不为列表项指定显式键，那么React将默认使用索引作为键。
何时需要key？一个好的经验法则是map()调用中的元素需要key。key要在兄弟间唯一，不需要全局唯一。key不会传递即无法通过props.key访问到，需要使用key值时要单独传递新属性。键应该是稳定的、可预测的和惟一的。不建议使用索引，在发生顺序变化时可能引发意料外的渲染，不建议使用随机数，这可能导致性能下降和在子组件中丢失状态。
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


“受控组件” 对于受控组件，输入值总是由React state驱动。

状态提升
在React中，共享状态是通过将其移动到需要它的组件的最近的公共祖先来实现的。这被称为“状态提升”。
通常，状态首先被添加到需要它来呈现的组件中。然后，如果其他组件也需要它，您可以将它提升到它们最近的共同祖先。您应该依赖自顶向下的数据流，而不是尝试在不同组件之间同步状态。
与双向绑定方法相比，提升状态需要编写更多的“样板”代码，但作为一个好处，它需要更少的工作来发现和隔离bug。因为任何状态都“存在”于某些组件中，而该组件本身就可以改变它，所以漏洞的表面积就大大减少了。此外，您可以实现任何自定义逻辑来拒绝或转换用户输入。 
当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。
像这种将组件的 state 提升到父组件的情形在重构 React 组件时经常会遇到。
我们知道道具是只读的。当state 提升到父组件时，就不可以调用this.setState()来更改它了。
在React中，这通常是通过让组件“受控”来解决的。





React思维
步骤1:将UI分解为组件层次结构
单一职责原则，也就是说，一个组件在理想情况下应该只做一件事。如果它最终增长，它应该被分解成更小的子组件。每个组件匹配数据模型的一个部分

步骤2:在React中构建静态版本
要构建一个渲染数据模型的应用程序静态版本，你需要构建重用其他组件并使用props传递数据的组件。props是一种将数据从父类传递到子类的方法。如果您熟悉状态的概念，那么完全不要使用状态来构建这个静态版本。状态仅用于交互，即随时间变化的数据。因为这是应用程序的静态版本，所以不需要它。

在这一步的最后，您将拥有一个可重用的组件库来呈现数据模型。组件将只有render()方法，因为这是你的应用程序的静态版本。React的单向数据流(也称为单向绑定)使一切都变得模块化和快速。要使UI具有交互性，您需要能够触发对底层数据模型的更改。React用state实现这一点。

步骤3:确定UI状态的最小(但完整)表示
它是通过props从父级传递进来的吗?如果是这样，它可能不是state。
它会随时间保持不变吗?如果是这样，它可能不是state。
你能根据组件中的其他状态或道具来计算吗?如果是这样，它就不是state。

步骤4:确定React哪个组件拥有state
识别每个基于那个状态呈现东西的组件。
找到一个公共所有者组件(在层次结构中需要该状态的所有组件之上的一个组件)。
公共所有者或其他更高层次的组成部分应该拥有state。
如果找不到可以拥有状态的组件，可以创建一个新的组件来保存状态，并将其添加到公共所有者组件之上的某个层次结构中。

步骤5:添加反向数据流
层次结构深处的表单组件更新更高层次的组件的state。 














懒加载lazy
上下文context
当某些数据需要由不同嵌套级别的许多组件访问时，主要使用上下文。谨慎地应用它，因为它使组件重用更加困难。上下文允许您将此类数据及其更改“广播”给下面的所有组件。使用上下文可能比其他方法更简单的常见示例包括管理当前语言环境、主题或数据缓存。
如果您只是想避免在许多级别传递一些props，那么组件组合通常是比上下文更简单的解决方案。
将子组件作为props传递，也可用此模式将子节点与其直接父节点解耦

错误边界的工作原理类似于JavaScript catch{}块，但它用于组件。只有类组件可以是错误边界。
错误边界只捕获树中它们下面的组件中的错误。错误边界不能捕获自身内部的错误。如果错误边界无法呈现错误消息，则错误将传播到它上面最近的错误边界。这也类似于JavaScript中的catch{}块的工作方式。
错误边界的粒度由您决定。您可以包装顶级路由组件以向用户显示“出错了”消息，就像服务器端框架经常处理崩溃一样。您还可以将单个小部件包装在一个错误边界中，以保护它们不会崩溃应用程序的其余部分。
错误边界不捕捉事件处理程序内部的错误。React不需要从事件处理程序中的错误中恢复错误边界。与呈现方法和生命周期方法不同，事件处理程序不会在呈现期间发生。所以如果他们抛出异常了，React仍然知道在屏幕上显示什么。如果你需要捕获事件处理程序内部的错误，使用常规的JavaScript try / catch语句:
try / catch很棒，但它只适用于命令式代码: 然而，React组件是声明式的，并指定应该呈现的内容:


生命周期方法
shouldComponentUpdate 在重新呈现过程开始之前被触发。
即使React只更新更改的DOM节点，重新呈现仍然需要一些时间。在许多情况下，这不是问题，但是如果减速很明显，您可以通过覆盖生命周期函数shouldComponentUpdate来加速这一切，该函数在重新呈现过程开始之前被触发。这个函数的默认实现返回true，离开React来执行更新
如果您知道在某些情况下您的组件不需要更新，那么您可以从shouldComponentUpdate返回false，从而跳过整个呈现过程，包括在这个组件和下面的组件上调用render()。
在大多数情况下，不需要手工编写shouldComponentUpdate()，您可以从React.PureComponent继承。这相当于通过对当前和以前的道具和状态进行浅层比较来实现shouldComponentUpdate()。

Forwarding Refs
一种通过组件自动将Ref传递给其子组件的技术。对于应用程序中的大多数组件来说，这通常是不必要的。但是，它对某些类型的组件很有用，特别是在可重用组件库中。
Refs提供了一种访问DOM节点或对render方法中创建的元素做出反应的方法。
在典型的React数据流中，道具是父组件与子组件交互的唯一方式。要修改一个孩子，你需要用新的道具重新渲染它。但是，在一些情况下，您需要在典型数据流之外强制修改子流。要修改的子元素可以是React组件的实例，也可以是DOM元素。对于这两种情况，React提供了一个逃生口。

这里有一些很好的参考用例:
	管理焦点、文本选择或媒体播放。
	触发命令动画。
	与第三方DOM库集成。


Higher-Order Components  --- 一种组合模式 提取出可重用行为减少代码量 一个方法接收组件参数返回新的带有可重用行为的组件 注意静态方法要复制 refs无法重用 如果向HOC添加ref, ref将引用最外层的容器组件，而不是被包装的组件。幸运的是，我们可以使用React.forwardRef API显式地将refs转发到内部组件。
Render Props  ---  一个提供方法的prop 提高渲染效率 行为具有相关性 可以使用带有Render Prop的常规组件来实现大多数的HOC。 render可以换个名字
<Mouse render={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>

this.props.render(this.state) 并不是在组件中修改了props，而是将参数传给props.render   

注意在React.PureComponent中使用Render Props要小心
使用Render Prop会抵消使用React.PureComponent带来的优势如果在render()中创建方法。这是因为对于新的prop，浅prop比较总是返回false，并且在这种情况下，每次渲染都会为Render Prop生成一个新的值。  这时可以将render prop定义为一个实例方法 提出到render()之外
React 16.8 新增hook让您不用编写类就可以使用state和其他React特性。
为什么会出现钩子hook？
1. 很难在组件之间重用有状态逻辑：React没有提供将可重用行为添加到组件的方法
可以通过render props 和HOC尝试解决这个问题，但这要求重构代码。你可能会发现组件的“包装地狱”，由提供者providers、使用者,consumers、高阶组件HOC、渲染道具render props和其他抽象层包围。所以React需要一个更好的原语来共享有状态逻辑。通过使用钩子，可以从组件中提取有状态逻辑，以便能够独立地测试和重用它。
2. 复杂的组件变得难以理解：
3. 类混淆了人和机器：除了使代码重用和代码组织更加困难之外，我们还发现类是学习React的一大障碍。
您必须了解this在JavaScript中是如何工作的，这与在大多数语言中是非常不同的。人们可以很好地理解道具、状态和自顶向下的数据流，但仍然很难理解类。类不能很好地缩小，它们使得热重新加载不稳定且不可靠。
从概念上讲，React组件总是更接近函数。

什么是钩子
钩子是一种功能，它可以让你从功能组件“钩入”React状态和生命周期特性。
什么是钩子?钩子是一种特殊的函数，可以让您“钩入”React特性。例如，useState是一个钩子，它允许您向功能组件添加反应状态。
我什么时候用鱼钩?如果您编写了一个函数组件，并且意识到需要向其添加一些状态，那么以前您必须将其转换为一个类。现在您可以在现有的函数组件中使用一个钩子。
React提供了一些内置的钩子，比如useState。您还可以创建自己的钩子来重用不同组件之间的有状态行为。

State Hook
React提供的一个名为useState的钩子。有时我们也称它为"状态挂钩"它允许我们添加本地状态来响应函数组件，你可以在单个组件中多次使用状态挂钩

Effect Hook
效果钩子让你在功能组件中执行副作用(或 “效果”)，在React组件中获取数据、设置订阅和手动更改DOM都是副作用的例子。调用useEffect时，您是在告诉React在刷新DOM的更改后运行“effect”函数。默认情况下，React会在每次渲染之后运行“effect”——包括第一次渲染。
钩子允许您根据相关的部分(如添加和删除订阅)来组织组件中的副作用，而不是强制基于生命周期方法进行拆分，它允许您在组件中执行副作用，并且类似于类中的生命周期方法
如果您熟悉React类生命周期方法，您可以将useEffect钩子看作是componentDidMount、componentDidUpdate和componentWillUnmount的组合。
React组件有两种常见的副作用:不需要清理的副作用和需要清理的副作用。
有时，我们希望在React更新了DOM之后运行一些额外的代码。网络请求、手工DOM突变和日志记录是不需要清理的常见效果示例。
在React类组件中，render方法本身不应该造成副作用。因为这里还为时过早——我们通常希望在React更新了DOM之后再执行效果。这就是为什么在React类中，我们将副作用放到componentDidMount和componentDidUpdate中。请注意，我们必须在类中的这两个生命周期方法之间复制代码。
这是因为在许多情况下，我们希望执行相同的副作用，而不管组件是刚刚挂载还是已经更新。从概念上讲，我们希望它在每次呈现之后发生——但是React类组件没有这样的方法。我们可以提取一个单独的方法，但是我们仍然必须在两个地方调用它。
Effect Hook是做什么的?通过使用这个钩子，你告诉React你的组件需要在渲染之后做一些事情。React将记住您传递的函数(我们将把它称为“效果”)，并在执行DOM更新之后调用它。
为什么在组件内部调用useEffect ?将useEffect放在组件中，我们可以直接从该效果访问状态变量(或任何prop)。我们不需要一个特殊的API来读取它——它已经在函数作用域中了。钩子包含了JavaScript闭包，并避免引入JavaScript已经提供解决方案的React-specific APIs。
是否每次渲染后都会运行useEffect ?是的!默认情况下，它在第一次渲染和每次更新之后运行。
与componentDidMount或componentDidUpdate不同，使用useEffect计划的效果不会阻止浏览器更新屏幕。这让你的应用程序感觉响应更快。大多数效果不需要同步发生。在不常见的情况下(比如测量布局)，有一个单独的useLayoutEffect钩子，其API与useEffect相同。

钩子是JavaScript函数，但是它们附加了两个规则：
只在顶层调用钩子。不要在循环、条件或嵌套函数内部调用钩子。
只从React函数组件调用钩子。不要从常规JavaScript函数中调用钩子。

建立自己的钩子
有时，我们希望在组件之间重用一些有状态逻辑。传统上，这个问题有两种流行的解决方案:高阶组件和渲染道具。自定义钩子允许您这样做。钩子是重用有状态逻辑的一种方式，而不是状态本身。实际上，对钩子的每个调用都有一个完全隔离的状态——所以您甚至可以在一个组件中两次使用同一个自定义钩子。
如果一个函数的名字以“use”开头，并且它调用了其他钩子，我们称它为自定义钩子。useSomething命名约定是我们的linter插件能够使用钩子发现代码中的bug的方式。

还有一些不太常用的内置钩子，您可能会发现它们很有用。例如，useContext允许您订阅React上下文而不引入嵌套:

useReducer可以通过一个reducer管理复杂组件的本地状态:

钩子不能在类内部工作。但是您可以使用它们来代替编写类。

调用useState是做什么的?它声明一个“状态变量”。 通常，当函数退出时，变量“消失”，但状态变量被React保留。
我们传递给useState的参数是什么?useState()钩子的唯一参数是初始状态。与类不同，状态不必是一个对象。如果我们想在状态中存储两个不同的值，我们将调用两次useState()。
useState返回什么?它返回两个值:当前状态和一个更新状态的函数。

你可能想知道:为什么useState不命名为createState ?
“Create”不是很准确，因为状态只在第一次渲染时创建。在接下来的渲染中，useState会给我们当前状态。

读状态和更新状态在类组件和函数组件中的区别

方括号是什么意思?
当我们声明一个状态变量时，你可能已经注意到方括号: const [fruit, setFruit] = useState('banana');
这种JavaScript语法称为“数组解构”。这意味着我们创建了两个新变量fruit和setFruit，其中fruit被设置为useState返回的第一个值，setFruit是第二个。

function radioChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    let value = (event.target as HTMLInputElement).value;
    switch ((event.target as HTMLInputElement).name) {
      case "IFRadio":


