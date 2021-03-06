## Cypress测试入门    

### 官网简介    

1.概述    

> Cypress是为现代web构建的下一代前端测试工具。这使您能够编写更快、更容易和更可靠的测试。    
> 我们的用户通常是使用现代JavaScript框架构建web应用程序的开发人员或QA工程师。Cypress使您可以编写所有类型的测试:    
> 端到端测试 集成测试 单元测试 Cypress可以测试在浏览器中运行的任何内容。    
> 不需要安装或配置服务器、驱动程序或任何其他依赖项。Cypress的运行速度与浏览器呈现内容的速度一样快。可在开发应用程序时实时观察测试的运行情况。    

2.特点    

> 其他测试框架无法做到的事情:    
> - 时间旅行:Cypress在测试运行时拍摄快照。将鼠标悬停在命令日志中的命令上，查看每一步都发生了什么。    
> - 可调试性:停止猜测测试失败的原因。直接从熟悉的工具(如开发人员工具)进行调试。我们可读的错误和堆栈跟踪使调试快如闪电。    
> - 自动等待:永远不要在测试中添加等待或休眠。Cypress在继续下一步之前会自动等待命令和断言。不再异步地狱。    
> - 间谍、存根和时钟:验证和控制功能、服务器响应或计时器的行为。    
> - 网络流量控制:在不涉及服务器的情况下，轻松地控制、存根和测试边界用例。您可以根据自己的喜好设置网络流量存根。    
> - 一致的结果:我们的架构不使用Selenium或WebDriver。欢迎快速、一致、可靠、无碎片的测试。    
> - 屏幕截图和视频:查看失败时自动拍摄的屏幕截图，或者从CLI运行时整个测试套件的视频。    
> - 跨浏览器测试:在本地运行Firefox和chrom系列浏览器(包括Edge和Electron)中的测试，最好在持续集成管道中进行。    

3.关键区别    

> 大多数测试工具(如Selenium)都是在浏览器之外运行，并通过网络执行远程命令。正好相反，Cypress在与应用程序相同的运行循环中执行。    
> Cypress的背后是一个节点服务器进程。Cypress和节点进程经常通信、同步，并代表彼此执行任务。
> 访问这两个部分(正面和背面)使我们能够实时响应应用程序的事件，同时在浏览器之外工作，完成需要更高权限的任务。    
> Cypress还通过动态读取和修改web流量在网络层进行操作。这使得Cypress不仅可以修改进出浏览器的所有内容，还可以修改可能干扰其实现浏览器自动化能力的代码。    
> Cypress最终从上到下控制整个自动化过程，这使它处于能够理解在浏览器内外发生的一切的独特位置。这意味着Cypress能够比其他任何测试工具提供更一致的结果。    
> 因为Cypress是本地安装在计算机上的，所以它还可以接入操作系统来完成自动化任务。这使得执行诸如截屏、录制视频、一般文件系统操作和网络操作等任务成为可能。    

4.本地访问    

> 因为Cypress在应用程序中操作，这意味着它可以本机访问每个对象。无论是窗口、文档、DOM元素、应用程序实例、函数、定时器、service worker还是其他任何东西，
> 您都可以在Cypress测试中访问它。没有对象序列化，没有网络协议，您可以访问所有内容。测试代码可以访问与应用程序代码相同的所有对象。    

5.新型测试    

> 对您的应用程序、网络流量和对每个主机对象的本机访问进行最终控制，可以开启一种以前从未实现过的新的测试方法。
> Cypress可以让你改变你的应用程序工作方式的任何方面，能轻易地控制它。
> 您可以像在单元测试中那样人为地创建这些状态，而不是像创建给定情况所需的状态那样缓慢而昂贵的测试。例如，你可以:    
> - 存根浏览器或应用程序的功能，并强制它们在测试用例中按需要运行。    
> - 公开数据存储(如在Redux中)，这样就可以通过编程直接从测试代码更改应用程序的状态。    
> - 通过强制服务器发送空响应来测试像“空视图”这样的边缘情况。    
> - 通过将响应状态码修改为500，测试应用程序如何响应服务器上的错误。    
> - 直接修改DOM元素，比如强制显示隐藏的元素。    
> - 以编程方式使用第三方插件。您可以直接从测试代码中调用方法来控制它们，而不是纠缠于复杂的UI小部件，如下拉列表、树视图或日历。    
> - 在测试时，防止在执行任何应用程序代码之前加载谷歌分析。    
> - 在应用程序转换到新页面或开始卸载时获得同步通知。    
> - 通过向前或向后移动来控制时间，以便计时器或轮询自动启动，而不必等待测试所需的时间。    
> - 添加您自己的事件监听器来响应应用程序。在Cypress中进行测试时，可以更新应用程序代码以使其表现不同。
> - 你可以从Cypress中控制WebSocket消息，有条件地加载第三方脚本，或者直接在你的应用程序上调用函数。    

6.快捷方式    

> 试图努力测试应用程序的各个领域?不喜欢一个行为产生的副作用?厌倦了一遍又一遍地重复缓慢的动作?对于大多数测试用例，您可以跳过它们。    
> Cypress可以防止您被迫总是“像用户一样”生成给定情况的状态。使用Cypress，您可以以编程方式交互和控制您的应用程序。您不再需要使用UI来构建状态。    
> 这意味着您不必访问登录页面，输入用户名和密码，并等待页面加载和/或重定向每次您运行的测试。Cypress提供了使用快捷方式和通过编程登录的功能。
> 通过使用像cy.request()这样的命令，您可以直接发送HTTP请求，同时使这些请求与浏览器同步。cookie会自动发送并应用回去。
> 担心CORS?别担心，它完全被忽略了。您可以选择什么时候像用户一样进行测试，什么时候跳过缓慢和重复的部分。    

7.抗碎片    

> Cypress同步地知道并理解应用程序中发生的所有事情。它会在页面加载和卸载时得到通知。Cypress不可能在触发事件时遗漏元素。
> Cypress甚至知道一个元素的动画速度，并会等待它停止动画。此外，它会自动等待元素变得可见、启用和停止被覆盖。
> 当页面开始转换时，Cypress将暂停命令执行，直到完全加载下一个页面。您甚至可以告诉Cypress等待特定的网络请求完成。    
> Cypress在浏览器中执行绝大多数命令，因此没有网络延迟。命令的执行和驱动您的应用程序以最快的速度呈现。
> 要处理处理复杂UI的现代JavaScript框架，可以使用断言告诉Cypress应用程序的期望状态是什么。Cypress将自动等待您的应用程序达到此状态后再继续。
> 完全不必担心手动等待或重试。Cypress会自动等待元素的存在，并且永远不会向您提供已经从DOM分离出来的过时元素。    

8.可测试性    

> 您可以在运行测试时使用开发人员工具，您可以看到每个控制台消息和每个网络请求。您可以检查元素，甚至可以在规范代码或应用程序代码中使用调试器语句。
> 没有保真度损失——你可以使用所有你已经熟悉的工具。这使您能够同时进行测试和开发。    

### 安装使用    

1.安装过程看官网就好https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install，有video很容易，我就不CV了。
简单提两点：Node版本要求10以上；Cypress3.0版本默认全局安装，所以package.json里不会有记录。    

2.按照官网教程走，Cypress open之后可能会发现自己的浏览器选项里没有Chrome，这个问题我记录在了issue里：https://github.com/missgentle/Q-A/issues/39    

3.第一个测试：    

```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```

describe, it, expect 所有这些功能都来自Cypress的捆绑工具:    
describe 和 it 来自于 Mocha    
expect 来自于 Chai    
Cypress构建在这些流行的工具和框架之上。    

4.一个真正的测试：    

一个可靠的测试通常包括三个阶段:    
- 设置应用程序状态    
- 采取一个行动    
- 对结果应用程序状态进行断言    

您可能还会看到这样的措辞:“Given, When, Then”，或“Arrange, Act, Assert”。
但其思想是:首先将应用程序置于特定状态，然后在应用程序中采取某些操作导致其更改，最后检查结果应用程序状态。    

**第一步：访问页面**    

我们可以将想要访问的URL传递到cy.visit()。    

```
describe('My First Test', () => {
	it('visite the kitchen sink', () => {
		cy.visit('http://example.cypress.io')
	})
})
```    

Cypress不是一个通用的web自动化工具。它不太适合编写不受您控制的实时、生产网站的脚本。因为：    
- 它们可能会检测到您是一个脚本并阻止您的访问(谷歌会这样做)。    
- 它们可能启用了阻止Cypress工作的安全特性。    

**第二步：查询元素**    

按内容查找元素，我们将使用cy.contains()。    

```
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type')
  })
})
```    

即使不添加断言，我们也知道一切正常!这是因为Cypress的许多命令在没有找到它们期望找到的东西时就会失败。这被称为默认断言。    
如果是不可见元素会带有不可见标志。如果查找的元素不存在它会自动等待并重试，因为它期望最终能在DOM中找到内容。它不会立即失败!至少4秒以上。    

**第三步：点击元素**    

在cy.contains()的命令末尾添加一个.click()命令。    
`cy.contains('type').click()`    

对一个不可见元素进行点击会报错比如`cy.contains('ser').click()`    
但我尝试`cy.contains('Command').click().contains('ser').click()`却还是报错，不清楚contains()的查找范围。

**第四步：做出断言**    

我们可以通过查找URL并使用.should()将断言链接到该URL。    
`cy.url().should('include', '/commands/actions')`    

在给定的测试中，我们不局限于单个交互和断言。实际上，应用程序中的许多交互可能需要多个步骤，并且可能以多种方式改变应用程序状态。    
我们可以通过添加另一个链来与这个新页面上的元素交互并验证其行为，从而继续这个测试中的交互和断言。    
我们可以使用cy.get()根据CSS类选择元素。然后使用.type()命令将文本输入到选定的输入中。最后，验证输入的值是否反映了用另一个.should()输入的文本。    

```
describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
```    

值得注意的是，这个测试跨越了两个不同的页面。Cypress自动检测页面转换事件之类的事件，并自动停止运行命令，直到下一个页面完成加载。    
这意味着您不必担心意外地对过期页面运行命令，也不必担心对部分加载的页面运行命令。    
在本例中，当Cypress检测到一个页面转换事件时，它会自动将单个页面加载事件的超时时间增加到60秒而不再是4秒。    
换句话说，基于命令和发生的事件，Cypress自动修改其预期超时以匹配web应用程序行为。    
这些不同的超时在配置文档中定义。    

5.调试    

Cypress附带了许多调试工具，可以帮助您理解测试。如：    

- 回到每个命令的快照。
- 参见发生的特殊页面事件。
- 接收关于每个命令的额外输出。
- 在多个命令快照之间向前/向后迈步。
- 暂停命令并迭代地单步执行它们。
- 当发现隐藏元素或多个元素时可视化。

**时间旅行&快照**    

将鼠标移到命令日志中的CONTAINS命令上Cypress自动回到命令解析时的快照，点击将会锁定。    
对于元素查找将定位到元素并置顶；对于页面跳转会看到url的前后变化；对于一些事件操作会看到一个小红点；    
快照菜单面板：before快照是在单击事件触发之前拍摄的。after快照是在单击事件之后立即拍摄的。    

**错误**    

当Cypress测试过程中出现错误时，Cypress打印几条信息：    
- 1 错误名称:这是错误的类型(例如AssertionError, CypressError)    
- 2 错误消息:这通常告诉您哪里出错了。有些可能会告诉您如何修正错误。    
- 3 了解更多:一些错误消息包含一个了解更多链接，它将带您到相关的Cypress文档。    
- 4 bug代码文件:单击此链接将在首选文件开启器中打开该文件，并在支持该文件的编辑器中突出显示该行和列。    
- 5 代码框架:这显示了发生故障的代码片段，突出显示了相关的行和列。    
- 6 查看堆栈跟踪:单击该选项可切换堆栈跟踪的可见性。堆栈轨迹的长度不同。单击一个蓝色的文件路径将在您首选的文件开启器中打开该文件。    
- 7 打印到控制台按钮:点击这个，打印完整的错误到你的DevTools控制台。这通常允许您点击堆栈跟踪中的行，并在DevTools中打开文件。    

**页面事件**    

Cypress本身将在重要事件发生时从应用程序注销。包括：    
- 网络XHR请求    
- URL散列的变化    
- 页面加载    
- 表单提交    

**控制台输出**    

我们可以在控制台看到Cypress输出的附加信息：    
- Command (已发出)    
- Yielded (这个命令返回的内容)    
- Elements (找到的元素的数量)    
- Selector (我们使用的参数)    

**特殊命令**    

除了一个有用的UI，还有专门用于调试任务的特殊命令。例如：    
- cy.pause()    
- cy.debug()    

### 测试你的APP    

1.配置Cypress    

启动你的本地服务器之后，Cypress访问它，可能是以下代码：    
```
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8888') // 改成你的本地服务器URL
  })
})
```    
您将大量输入这个URL，因为每个测试都需要访问您的应用程序的某个页面。    
Cypress为此提供了一个配置选项。cypress.json文件让我们添加baseUrl选项：    
```
{
  "baseUrl": "http://localhost:8888"
}
```    
这将自动使用这个baseUrl为cy .visit()和cy .request()命令添加前缀。    
当您修改配置文件时，Cypress将自动重新启动。    
我们现在可以访问相对路径并省略主机名和端口。    
```
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})
```    
更多配置参数：https://docs.cypress.io/guides/references/configuration.html#Options    

2.测试策略    

**播种数据    

要测试各种页面状态(如空视图或分页视图)，需要在服务器上播种，以便测试该状态。通常有三种方式来促进这与Cypress:    

- cy.exec() 运行系统命令    
- cy.task() 通过插件文件在Node中运行代码    
- cy.request() 发出HTTP请求    

如果您在服务器上运行node.js，您可以添加一个before或beforeEach钩子来执行npm任务。

```
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })
})
```    

有时为了告诉服务器您想要创建的确切状态需要将多个请求组合在一起，使用Cypress，还有其他几种方法可以提供更好更快的体验。    

**服务器存根    

一种有效的方法是完全绕过它，而不是播撒种子并与服务器通信。你仍然会收到来自服务器的所有常规HTML/JS/CSS资源，并将继续以同样的方式对其进行cy.visit()。您可以存根它的JSON响应。    

这意味着不必重新设置数据库，也不必按照我们想要的状态对其播种，您可以强制服务器按照您想要的方式响应。
这样，我们不仅不需要同步服务器和浏览器之间的状态，而且还防止了测试状态的变化。这意味着测试不会建立可能影响其他测试的状态。    

另一个好处是，这使您可以在不需要服务器契约存在的情况下构建应用程序。您可以按照您希望的数据结构方式构建它，甚至可以测试所有的边界情况，而不需要服务器。

虽然存根很棒，但这意味着您不能保证这些响应有效负载实际上与服务器将发送的内容相匹配。然而，仍然有许多有效的方法来解决这个问题:    

Generate the fixture stubs ahead of time    
Write a single e2e test without stubs, and then stub the rest    

**登录    

```
describe('The Login Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
      .its('body')
      .as('currentUser')
  })

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    cy.visit('/login')

    cy.get('input[name=username]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })
})
```    

不要在每次测试前使用UI登录。不要使用你的UI来建立状态!它非常缓慢，笨重，而且没有必要。    
我们可以通过使用cy.request()跳过需要使用UI的部分。因为cy.request()会在幕后自动获取和设置cookie，所以我们实际上可以使用它来构建状态。    

我们不需要实际使用UI就可以登录。这节省了访问登录页面、填写用户名、密码以及在每次测试前等待服务器重定向我们的大量时间。

```
describe('The Dashboard Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
      .its('body')
      .as('currentUser')
  })

  it('logs in programmatically without using the UI', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    // programmatically log us in without needing the UI
    cy.request('POST', '/login', {
      username,
      password
    })

    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit('/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })
})
```    

当处理系统中任何需要在其他地方设置状态的区域时，请使用上述方法。只要记住——不要使用你的UI!
