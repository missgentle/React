## 查询元素    

某种程度上，Cypress就像jQuery，它捆绑了jQuery并向您公开了它的许多DOM遍历方法，因此您可以使用熟悉的api轻松地处理复杂的HTML结构。    

```
// 每个方法都与对应的jQuery方法等价。
cy.get('#main-content')
  .find('.article')
  .children('img[src^="/static"]')
  .first()
```    

但是，访问查询返回的DOM元素的工作方式有所不同:    

```
// 这没问题，jQuery同步返回元素。
const $jqElement = $('.element')

// 这行不通!Cypress不会同步返回元素。
const $cyElement = cy.get('.element')
```    

另外的不同点：    
当jQuery无法从选择器中找到任何匹配的DOM元素时，它返回一个空的jQuery集合。我们有了一个实际的对象，但它不包含我们想要的元素。因此，我们开始添加条件检查并手动重新尝试查询。    
当Cypress无法从其选择器中找到任何匹配的DOM元素时，Cypress自动重试查询，直到:    
1. 元素找到了    
2. 达到设置的超时    

Cypress用更适合实际web应用程序工作的健壮的返回和超时逻辑包装了所有DOM查询。这使得Cypress更加健壮，并且对其他测试工具中出现的许多常见问题具有免疫力。    

在Cypress中，当您希望直接与DOM元素交互时，可以使用一个接收该元素作为第一个参数的回调函数调用then()。当您想要完全跳过retry-and-timeout功能功能并执行传统的同步工作时，请使用Cypress.$。    

另一种定位事物的方法——一种更人性化的方法——是根据内容，面向用户的文本来查找DOM元素。为此，可以使用方便的sy .contains()命令，例如:     

```
// 在文档中查找包含文本“New Post”的元素
cy.contains('New Post')

// 在文档中找到一个带有class'main'且包含文本'New Post'的元素
cy.get('.main').contains('New Post')
```    
Cypress预料到了web应用程序的异步特性，并且不会在第一次没有找到元素时立即失败。就是所谓的超时，并且大多数命令都可以用特定的超时时间定制(默认的超时时间是4秒)。    
这些命令将在其API文档中列出一个超时选项，详细说明如何设置继续尝试查找元素所需的毫秒数。    

```
// 让该元素在10秒内出现
cy.get('.my-slow-selector', { timeout: 10000 })
```    

还可以通过配置设置全局设置超时:defaultCommandTimeout。    

## 命令链    

理解Cypress用于将命令链接在一起的机制非常重要。它代表您管理一个Promise链，每个命令为下一个命令生成一个“subject”，直到链结束或遇到错误。开发人员不应该直接使用Promise。    

通过使用.click()和.type()命令以及cy.get()或cy.contains()命令，Cypress允许您单击页面上的元素并在其中键入内容。这里有更多的行动命令Cypress提供与您的应用程序互动:    

.blur() - 让一个元素失去焦点    
.focus() - 让一个元素获取焦点    
.clear() - 清除输入或文本区域的值    
.check() - 勾选复选框或单选    
.uncheck() - 取消选中复选框    
.select() - 在< Select >中选择一个<option>    
.dblclick() - 双击一个DOM元素    
.rightclick() - 右键单击一个DOM元素    

这些命令可以确保在执行操作之前元素的状态是什么。 Cypress确保能够与元素交互(就像真正的用户那样)。    
它会自动等待，直到元素达到“actionable”状态:不是隐藏的/被覆盖/disabled/animating    
这也有助于防止在测试中与应用程序交互时出现flake。通常可以使用force选项覆盖此行为。    




