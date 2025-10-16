# 开发规约

急着上手撸代码了？先别急，看看这里的开发规范吧！
本项目的开发规范分为【必须】和【建议】两种， 【必须】是指在任何情况下都必须遵守的规范，【建议】是指在大多数情况下都应该遵守的规范。
若PR代码，则所有的规范都必须要遵守。

## 持久层规约

项目采用的[Mybatis-Plus](https://plus.mybatis.ac.cn)作为持久层框架,mybatis plus最大的一个滥用点就是容易导致业务层被污染。
正是基于此，其他的一些问题还有如自带的方法也不支持Optional返回值等。 因此，虽然mybatis plus提供了很多的功能，但作者对其的使用尽量谨慎而克制，

### 【建议】规范
作者大胆采用了以下的规范：

1.虽然持久层继承了BaseMapper,但仅仅使用了新增、修改、删除、批量删除这四个基础功能，其他的的持久层操作必须通过自定义的xml完成。

2.使用mybatis plus的内置分页，但分页语句必须通过自定义的xml完成。

3.绝不使用IService及其子类，所有的持久层操作必须通过Mapper接口完成。

4.绝不使用Wrapper及其子类，所有的持久层查询操作必须通过自定义的xml完成。

5.使用mybatis plus的内置代码生成器时，只生成对应的持久层代码，要么不使用内置的代码生成器。


概括来说，作者对其的使用，相当于退化到了tk.mybatis + pagehelper的水平，完全放弃了mybatis plus的高级功能。

但正如mybatis plus的solon一样————
```
MyBatis-Plus 是一个 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。
```
作者只是反其道而行之，在增强工具MyBatis-Plus的基础上只克制不做改变，为规范开发、提高代码通用性而生。
但是，如果你就是喜欢使用mybatis plus的内置功能，那么你可以继续使用它们,之前如何使用mybatis plus,现在依然可以使用熟悉的路径继续使用它。

#### 优势
这样做的优势在于：
1. 三层结构各司其职，持久层代码通用性更强，更容易维护与复用。
2. 方便替换到其他的变种mybatis框架，比如mybatis-flex,xbatis,tk.mybatis,甚至是mybatis本身。
3. 方便替换到其他的持久层实现，如果你想用jpa,spring data jdbc那么你可以直接替换掉持久层的实现,~~而不需要改动业务层和控制层的代码~~,至少尽可能的少改动业务层的代码。


#### 劣势
- 费手
- 费眼

可以通过折叠xml来缓解，也可以通过IDEA的```region```注释语法来缓解，也可以通过[MyBatisCodeHelperPro](https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro)插件来缓解。
