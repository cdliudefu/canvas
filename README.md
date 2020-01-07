# canvas简介
## 1.1 canvas是什么
  - Canvas是一个矩形区域的画布，可以用javascript在上面绘画，控制其每一个像素
  - Canvas标签使用javascript在网页上绘制图像，本身不具备绘图功能
  - canvas拥有多种绘制路径、矩形，圆形，字符以及添加图像的方法
  - HTML5之前的web页面只能用一些固定样式的标签，
## 1.2 canvas主要应用领域
 1. 游戏：canvas在基于web的图像显示方面比flash更加立体，更加精巧，流畅度和跨平台方面更好
 2. 可视化数据，数据图表，比如百度的echart
 3. banner广告：HTML5技术能在banner广告上发挥重大作用，用canvas实现动态的广告效果再合适不过
 4. 未来->模拟器：无论从视觉效果还是核心功能方面来说，模拟器可以完全由JavaScript来实现
 5. 未来-->远程计算机控制：canvas可以让开发者更好的实现基于web的数据传输，构建一个完美的可视化控制界面
 6. 未来-->图形编辑器：photoshop图形编辑器能够100%基于web实现
 7. 可以嵌入网站内容更丰富，特效更多，类似图表、音频、视频等
 8. 完整的canvas移动化应用

 ## 2.1 Canvas标签
  ### 2.1.1 canvas标签语法和属性
  - canvas：画布的意思，标签名canvas，需要闭合，就是HTML5的普通标签
  - 可以设置width和height属性，但是属性值单位必须是PX，否则忽略
  - canvas的width和height默认值：300*150像素
  - 需要注意: 1）不要用CSS控制canvas的宽高，容易图片拉伸；2）重新设置canvas标签的宽高属性会让画布搽除所有的内容
  - 可以给canvas画布设置背景色
  ### 2.1.2 浏览器不兼容处理
  - ie9以上才支持canvas，其他浏览器都支持
  - 只要浏览器兼容canvas，就会支持绝大部分API
  - 移动端的兼容情况很理想，基本上都可以使用
  - 2d的支持都非常好，3d(webgl)在ie11才支持，都他都支持
  - 如果浏览器不兼容，最好进行友好提示，如：
  ```html
    <canvas id="cavs">
      你的浏览器不支持canvas，请升级浏览器
    <canvas>
  ```
  - 浏览器不兼容，可以使用flash等手段进行降级
  ## 2.2 canvas绘图上下文context
  ### 2.2.1 context：canvas的上下文，绘制环境
  - 上下文：是所有的绘制操作API的入口或集合
  - canvas自身无法绘制任何内容，是通过JavaScript来操作
  - context对象就是JavaScript操作canvas的接口
  ```js
  var canvas = document.getElementById('cavs');//获取画布
  var ctx = canvas.getContext('2d');//注意：2d小写，3d:webgl
  ```
  ## 2.3 基本的绘制路径
  ### 2.3.1 canvas坐标系
  canvas坐标系，从最左上角(0,0)开始，x向右增大，y向下增大
  ### 2.3.2 设置绘制起点(moveTo)
    *语法：ctx.moveTo(x,y)
    *解释：设置上下文绘制路径的起点，相当于移动画笔到某个位置点
    *参数：x,y都相对于canvas盒子的最左上角
    *注意： 绘制线段前必须先设置起点
  ### 2.3.3 绘制直线(lineTo)
    *语法：ctx.lineTo(x,y)
    *解释：从x,y的位置绘制一条直线到起点或者上一个线头点
    *参数：x,y线头点坐标
  ### 2.3.4 路径开始和闭合
    *开始路径：ctx.beginPath()
    *闭合路径：ctx.closePath()
    *解释：如果是绘制不同状态的线段或形状，必须使用开始新路径的方法把不同的绘制操作隔开，闭合路径会自动把最后的线头和开始的线头连在一起。beginPath的核心作用是将不同绘制的形状进行隔离，每次执行此方式，表示重新绘制一个路径，跟之前的绘制墨迹可以进行分开样式设置和管理
  ### 2.3.5 描边（stroke）
    *语法：ctx.stroke()
    *解释：根据路径绘制线，路径只是草稿，真正绘制必须执行stroke
    *canvas绘制的基本步骤：
    。第一步：获取画布 canvas=document.getElement('cavs')
    。第二步：获取上下文 ctx = canvas.getContext('2d')
    。第三步：开始路径规划 ctx.beginPath()
    。第四步：移动起始点 ctx.moveTo(x,y)
    。第五步：绘制线（矩形、圆） ctx.lineTo(x,y)
    。第六步：闭合路径 ctx.closePath()
    。第七步：绘制描边 ctx.stroke()
  ### 2.3.6 Demo
  ```html
  <canvas id="cavsElem"> 你的浏览器不支持canvas，请升级浏览器 </canvas>
  ```
  ```js
  //===============基本绘制api====================
  //获得画布
  var canvas = document.querySelector('#cavsElem');
  var ctx = canvas.getContext('2d'); //获得上下文

  canvas.width = 900; //设置标签的属性宽高
  canvas.height = 600; //千万不要用 canvas.style.height
  canvas.style.border = '1px solid #000';

  //绘制三角形
  ctx.beginPath(); //开始路径
  ctx.moveTo(100, 100); //三角形，左顶点
  ctx.lineTo(300, 100); //右顶点
  ctx.lineTo(300, 300); //底部的点
  ctx.closePath(); //结束路径
  ctx.stroke(); //描边路径
  ```
  ### 2.3.7 填充（fill）
    *语法：ctx.fill()
    *解释：填充是将闭合的路径的内容填充具体的颜色，默认黑色
    *注意：交叉路径的填充问题，‘非零环绕原则’，顺逆时针穿插次数决定是否填充
    (“非零环绕规则”是这么来判断有自我交叉情况的路径的：对于路径中的任意给定区域，从该区域内部画一条足够长的线段，使此线段的终点完全落在路径范围之外。)
  ### 2.3.8 快速创建矩形（rect）
    *语法：ctx.rect(x,y,width,height)
    *解释：x,y是矩形左上角坐标，width和height是矩形宽高，以像素计
    *说明：rect方法只是规划矩形的路径，并没有填充和描边
  ### 2.3.9 快速创建描边矩形和填充矩形
    *语法：ctx.strokeRect(x,y,width,height)
    *解释：此方法绘制完矩形路径后立即stroke绘制描边

    *语法：ctx.fillRect(x,y,width,height)
    *解释：此方法绘制话矩形后，立即对当前矩形进行fill填充
  ### 2.3.10 清除矩形（clearRect）
    *语法：ctx.clearRect(x,y,width,height)
    *解释：清除某个矩形内的绘制的内容，相当于橡皮擦
  ## 2.4 绘制圆形（arc）
  ### 2.4.1 arc()方法用于创建弧形/曲线（创建圆或圆部分）
    *语法：ctx.arc(x,y,sAngle,eAngle,couterclockwise)
    *解释：
      x,y:圆心坐标；r：半径大小；sAngle：开始角度；eAngle：结束角度；couterclockwise：是否逆时针 true是逆时针 false：顺时针
    弧度和角度转换:rad = deg*Math.PI/180
  ## 2.5 绘制文字
  ### 2.5.1 绘制上下文的文字属性
  - font:设置或返回文本内容的当前字体属性，其语法与css中 font属性相同
  ```js
  ctx.font = '18px "微软雅黑"'
  ```
  - textAlign:设置或返回文本内容的当前对齐方式<br/>
    start：默认，文本在指定的位置开始<br>
    end：文本在指定的位置结束<br>
    center：文本在中心北放置的位置<br>
    left：文本左对齐<br>
    right：文本右对齐
  ```js
  ctx.textAlign = 'left'
  ```
  - textBaseline：设置或返回在绘制文本时使用的当前文本基线<br/>
    alphabetic：默认，文本基线是普通的字母基线<br>
    top：文本基线是方框的顶端<br>
    hanging：文本基线是悬挂基线<br>
    middle：文本基线是方框的正中<br>
    ideogrphic：文本基线是方框基线<br>
    bottom：文本基线是方框的底端
  ```js
  ctx.textBaseline = 'top'
  ```
  ### 2.5.2 上下文绘制文字方法
    *ctx.fillText() // 在画布上绘制被填充的文本
    *ctx.strokeText() //绘制文本无填充
    *ctx.measureText() //返回包含指定文本宽度的对象
  ```js
  ctx.moveTo(300, 300);
  ctx.fillStyle = 'purple'; //设置填充颜色为紫色
  ctx.font = '20px "微软雅黑"'; //设置字体
  ctx.textBaseline = 'bottom'; //设置字体底线对齐绘制基线
  ctx.textAlign = 'left'; //设置字体对齐的方式
  //ctx.strokeText( "left", 450, 400 );
  ctx.fillText('Top-g', 100, 300); //填充文字
  ```
  ## 2.6 绘制图片（drawImage）
  ### 2.6.1 绘制图片方法
    *语法：ctx.drawImage(img,x,y)
    *解释：x,y绘制图片左上角的坐标，img是绘制图片的dom对象
  ### 2.6.2 绘制图像，并设置图片的宽度和高度
    *语法：ctx.dragImage(img,x,y,width,height)
    *解释：width：图片的宽度，height：图片的高度；如果指定宽高，最好成比例，不然图片会被拉伸。等比公式：设置高=原高度x设置宽/原宽度
    (toH = height*toW/width)
  ### 2.6.3 图片裁减
    *语法：ctx.drawImage(img,sx,sy,swidth,sheight,xy,width,height)
    *解释：sx,sy:裁减的左上角坐标；swidth,sheight:裁减图片的宽度和高度，x,y:绘制图片的坐标，width,height:绘制图片的宽高
  ```js
    var image = new Image()
    image.src = './img/b.jpg'
    image.addEventListener('load', function (e) {
      ctx.beginPath()
      ctx.drawImage(image, 0, 100, image.width, image.height)
      // 图片截取
      ctx.drawImage(image,0,0,68,73,0,0,68,73)
      //截取图片文字
      ctx.drawImage(image,75,0,75,75,400,400,75,75)
      ctx.closePath()
    })
  ```
  ## 3.1 canvas颜色样式和阴影
  ### 3.1.1 设置填充和描边的颜色
    *语法：ctx.fillStyle = 'red' //设置填充的颜色
          ctx.strokeStyle = 'yellow' // 设置描边的颜色
    *解释：以上的可接受颜色名、16进制数据，rgb值
  ```js
  ctx.strokeStyle = 'red';
  ctx.strokeStyle = '#ccc';
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeStyle = 'rgba(255,0,0,6)';
  ```
  ### 3.1.2 设置阴影
  - 类似css3的阴影设置
  - shadowColor:设置或返回用于阴影的颜色
  - shadowBlur:设置或返回用于阴影的模糊级别，大于1的正整数，数组越高模糊程度越大
  - shadowOffsetX:设置或返回阴影矩形状态的水平距离
  - shadowOffsetY:设置或返回阴影矩形状态的垂直距离
  ```js
  ctx.fillStyle = 'rgba(255,0,0, .9)';
  ctx.shadowColor = 'teal';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillRect(100, 100, 100, 100);
```
## 3.2 复杂样式
### 3.2.1 创建线性渐变的样式
    *语法：ctx.createLinearGradient(x0,y0,x1,y1)
    *解释：x0,y0:起始坐标；x1,y1：结束坐标
```js
var grd = ctx.createLinearGradient(0, 0, 170, 0);
grd.addColorStop(0, 'black'); //添加一个渐变颜色，第一个参数介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
grd.addColorStop(1, 'white'); //添加一个渐变颜色
ctx.fillStyle = grd; //关键点，把渐变设置到 填充的样式
```
### 3.2.2 设置圆形渐变（径向渐变）
    *语法：ctx.createRadialGradient(x0,y0,r0,x1,y1,r1)
    *解释：
      x0: 渐变的开始圆的 x 坐标
      y0: 渐变的开始圆的 y 坐标
      r0: 开始圆的半径
      x1: 渐变的结束圆的 x 坐标
      y1: 渐变的结束圆的 y 坐标
      r1: 结束圆的半径
```js
var rlg = ctx.createRadialGradient(300, 300, 10, 300, 300, 200);
rlg.addColorStop(0, 'teal'); //添加一个渐变颜色
rlg.addColorStop(0.4, 'navy');
rlg.addColorStop(1, 'purple');
ctx.fillStyle = rlg; //设置 填充样式为延续渐变的样式
ctx.fillRect(100, 100, 500, 500);
```
### 3.2.3 绘制背景图
    *语法：ctx.createPattern(img,repeat)
    *解释：方法在指定的方向内重复指定的元素
      image ： 规定要使用的图片、画布或视频元素。
      repeat ： 默认。该模式在水平和垂直方向重复。
      repeat-x ： 该模式只在水平方向重复。
      repeat-y ： 该模式只在垂直方向重复。
      no-repeat： 该模式只显示一次（不重复）。
```js
var ctx = c.getContext('2d');
var img = document.getElementById('lamp');
var pat = ctx.createPattern(img, 'repeat');
ctx.rect(0, 0, 150, 100);
ctx.fillStyle = pat; //  把背景图设置给填充的样式
ctx.fill();
```
## 3.3 变换动画
### 3.3.1 缩放
- scale()方法缩放当前绘图，更大或更小
- 语法：ctx.scale(width,height)<br>
  width:缩放绘图的宽度(1=100,0.5=50%,2=200%依次类推)
  height：缩放绘图的高度(1=100,0.5=50%,2=200%依次类推)
- 注意：缩放的是整个画布，缩放后，继续绘制的图形会被放大或缩小
```js
 ctx.scale(0.5,0.5)
```
### 3.3.2 位移
- translate(x,y)方法重新映射画布上的(0,0)的位置
- 语法：ctx.translate(x,y)<br>
  x： 添加到水平坐标（x）上的值<br>
  y： 添加到垂直坐标（y）上的值
- 发生位移后，相当于把画布的0,0坐标更换到新的x,y的坐标位置，所有绘制的新元素都被影响
- 位移画布一般配合缩放和旋转
```js
ctx.translate(50,50) // 发生了坐标位移
```
### 3.3.3 旋转
- ctx.rotate(angle) // 方法旋转当前的绘图
- 参数是弧度PI
- 如需将角度转换为弧度，请使用 degrees*Math.PI/180 公式进行计算。
```js
ctx.rotate(30*Math.PI/180) // 旋转30度
```
### 3.3.4 绘制环境保存和还原
- ctx.save() //保存当前环境的状态<br>
  可以把当前绘制环境进行保存到缓存中
- ctx.restore() //返回之前保存过的路径状态和属性<br>
  获取最近缓存的 ctx
## 3.4 设置绘制环境的透明度
- ctx.globalAlpha=number;
- number:透明值。必须介于 0.0（完全透明） 与 1.0（不透明） 之间。
- 设置透明度是全局的透明度的样式。注意是全局的。
## 3.5 绘制画布限定区域
- ctx.clip(); 方法从原始画布中剪切任意形状和尺寸
- 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）
- 一般配合绘制环境的保存和还原。
## 3.6 保存画布base64编码内容
- 把 canvas 绘制的内容输出成 base64 内容。
- 语法：canvas.toDataURL(type, encoderOptions);
- 说明：<br>
    type，设置输出的类型，比如 image/png image/jpeg 等<br>
    encoderOptions： 0-1 之间的数字，用于标识输出图片的质量，1 表示无损压缩，类型为： image/jpeg 或者 image/webp 才起作用。
```js
var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
    // blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
    var img = document.querySelector("#img-demo");//拿到图片的dom对象
    img.src = canvas.toDataURL("image/png"); //将画布的内容给图片标签显示
```
## 3.7 画布渲染另一个画布
- ctx.drawImage(img,x,y);
- img 参数也可以是画布，也就是把一个画布整体的渲染到另外一个画布上。
```js
var canvas1 = document.querySelector('#cavsElem1');
var canvas2 = document.querySelector('#cavsElem2');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
ctx1.fillRect(20, 20, 40, 40);      //在第一个画布上绘制矩形
ctx2.drawImage(canvas1, 10, 10);    //将第一个画布整体绘制到第二个画布上
```
## 3.8 线条样式
- lineCap 设置或返回线条的结束端点(线头、线冒)样式<br>
    butt ： 默认。向线条的每个末端添加平直的边缘。<br>
    round ： 向线条的每个末端添加圆形线帽。<br>
    square： 向线条的每个末端添加正方形线帽。
- lineJoin 设置或返回两条线相交时，所创建的拐角类型<br>
    bevel: 创建斜角。<br>
    round: 创建圆角。<br>
    miter: 默认。创建尖角
- lineWidth 设置或返回当前的线条宽度
- miterLimit 设置或返回最大斜接长度（斜接长度指的是在两条线交汇处内角和外角之间的距离。 * 一般用默认值：10 就可以了。除非需要特别长的尖角时，使用此属性。）
## 3.9 贝塞尔曲线
### 3.9.1 绘制一条二次方曲线
- 语法：ctx.quadraticCurveTo(cpx,cpy,x,y);<br>
    cpx： 贝塞尔控制点的 x 坐标<br>
    cpy： 贝塞尔控制点的 y 坐标<br>
    x ： 结束点的 x 坐标<br>
    y ： 结束点的 y 坐标
```js
  ctx.beginPath();
  ctx.moveTo(20,20);
  //绘制2次方曲线，贝赛尔曲线
  ctx.quadraticCurveTo(20,100,200,20);
  ctx.stroke();
```
### 3.9.2 绘制一条三次方曲线
- 语法：ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
- 提示：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
- 说明：<br>
  cp1x: 第一个贝塞尔控制点的 x 坐标<br>
  cp1y: 第一个贝塞尔控制点的 y 坐标<br>
  cp2x: 第二个贝塞尔控制点的 x 坐标<br>
  cp2y: 第二个贝塞尔控制点的 y 坐标<br>
  x: 结束点的 x 坐标<br>
  y: 结束点的 y 坐标
```js
//绘制复杂的贝塞尔曲线
ctx.beginPath();
ctx.moveTo(400,400);
//参数说明：context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
// cp1x： 第一个贝塞尔控制点的 x 坐标
// cp1y： 第一个贝塞尔控制点的 y 坐标
// cp2x： 第二个贝塞尔控制点的 x 坐标
// cp2y： 第二个贝塞尔控制点的 y 坐标
// x: 结束点的 x 坐标
// y: 结束点的 y 坐标
ctx.bezierCurveTo(500, 200, 600, 600, 700, 300);
ctx.stroke();
```
## 创建两条切线的弧
- 在画布上创建介于当前起点和两个点形成的夹角的切线之间的弧
- 语法:ctx.arcTo(x1,y1,x2,y2,r); //类比：css3 中的圆角。
- 例如：ctx.arcTo(240, 100, 240, 110, 40);<br>
        x1: 弧的端点 1 的 x 坐标<br>
        y1: 弧的端点 1 的 y 坐标<br>
        x2: 弧的端点 2(终点)的 x 坐标<br>
        y2: 弧的端点 2(终点)的 y 坐标<br>
        r : 弧的半径
```js
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(200,100);
//context.arcTo(x1,y1,x2,y2,r); //类比：css3中的圆角。
ctx.arcTo(240, 100, 240, 110, 40);
ctx.lineTo(240, 300);
ctx.stroke();
```
## 3.11 判断点是否在路径中
- 语法：ctx.isPointInPath(x,y);
- 说明：isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。判断x,y坐标的点是否在当前的路径中。
## 3.12 文本宽度计算
- 语法：ctx.measureText(text).width;
## 3.13 动画过度
- setTransform() 将当前转换重置为单位矩阵。然后运行 transform()
- transform() 替换绘图的当前转换矩阵
- globalCompositeOperation 设置或返回新图像如何绘制到已有的图像上
## 4.1 封装常用的绘制函数
### 4.1.1 封装一个矩形
//思考：我们用到的矩形需要哪些绘制的东西呢？
1. 矩形的 x、y坐标
2. 矩形的宽高
3. 矩形的边框的线条样式、线条宽度
4. 矩形填充的样式
5. 矩形的旋转角度
6. 矩形的缩小放大
```js
//下面是把上面所有的功能进行封装的代码：
function ItcastRect( option ) {//矩形构造函数
    this._init(option);
}
ItcastRect.prototype = {  //矩形的原型对象
    _init: function( option ) {  //初始化方法
        option = option || {};
        this.x = option.x === 0 ? 0 : option.x || 100;
        this.y = option.y === 0 ? 0 : option.y || 100;
        this.w = option.w || 100;
        this.h = option.h || 100;
        this.angle = option.angle === 0 ? 0 : option.angle || 0;
        this.fillStyle = option.fillStyle || 'silver';
        this.strokeStyle = option.strokeStyle || 'red';
        this.strokeWidth = option.strokeWidth || 4;
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.Y || 1;
    },
    render: function( ctx ) {//把矩形渲染到canvas中
        ctx.save();
        ctx.translate( this.x, this.y );//位移画布
        ctx.rotate( this.angle * Math.PI / 180 );//旋转角度
        ctx.scale( this.scaleX, this.scaleY );//缩放
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect( 0, 0, this.w, this.h ); //填充矩形
        ctx.lineWidth = this.strokeWidth;     //线宽
        ctx.strokeStyle = this.strokeStyle;   //填充样式
        ctx.strokeRect( 0,0,this.w,this.h );  //描边样式
        ctx.restore();
    },
    constructor: ItcastRect
};
```
### 4.1.2 封装一个圆形
```js
function ItcastCircle(option) {
  this._init(option);
}
ItcastCircle.prototype = {
  _init: function(option) {
    option = option || {};
    this.x = option.x === 0 ? 0 : option.x || 100;
    this.y = option.y === 0 ? 0 : option.y || 100;
    this.w = option.w || 100;
    this.h = option.h || 100;
    this.angle = option.angle === 0 ? 0 : option.angle || 0;
    this.fillStyle = option.fillStyle || 'silver';
    this.strokeStyle = option.strokeStyle || 'red';
    this.strokeWidth = option.strokeWidth || 4;
    this.scaleX = option.scaleX || 1;
    this.scaleY = option.Y || 1;
    this.opactity = option.opactity || 1;
    this.counterclockwise =
      option.counterclockwise === true
        ? true
        : option.counterclockwise || false;
    this.startAngle = option.startAngle == 0 ? 0 : option.startAngle || 0;
    this.endAngle = option.endAngle == 0 ? 0 : option.endAngle || 0;
    this.startAngle = (this.startAngle * Math.PI) / 180;
    this.endAngle = (this.endAngle * Math.PI) / 180;
    this.r = option.r || 100;
  },
  render: function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.rotate((this.agnle * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.moveTo(0, 0);
    ctx.arc(
      0,
      0,
      this.r,
      this.startAngle,
      this.endAngle,
      this.counterclockwise
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
  constructor: ItcastCircle
};
```
## 4.2 第三方库
- Rgraph vs 百度的 echart //https://roopons.com.au/wp-content/plugins/viral-optins/js/rgraph/
- 国产的 egret 引擎 // http://www.egret-labs.org/
- 3d 引擎：treejs  // http://threejs.org/
- Konva  // http://konvajs.github.io/
# Konva
## 特点：
     * 小巧、使用方便、适合移动端和pc端
     * 支持丰富的事件处理操作
     * 支持类似JQuery的操作方式（顺带能复习jQueyr）
     * 开源，可以随意更改
     * 社区更新比较活跃，github托管源码
     * 性能也不错
## 5.1 Konva的整体理念
- 舞台的概念的引入。整个视图看做是一个舞台 stage
- 舞台中可以绘制很多个层 layer
- layer 下面可以有很多的 group
- group 下面可以有 矩形、图片、其他形状等
## 5.2 Konva 矩形案例
### 5.2.1 创建一个矩形:Konva.Rect(option);
```js
//Konva使用的基本案例
//第一步：创建舞台
var stage = new Konva.Stage({
    container: 'container',     //需要存放舞台的Dom容器
    width: window.innerWidth,   //设置全屏
    height: window.innerHeight
});

//第二步：创建层
var layer = new Konva.Layer();  //创建一个层
stage.add(layer);               //把层添加到舞台

//第三步： 创建矩形
var rect = new Konva.Rect({     //创建一个矩形
    x: 100,                     //矩形的x坐标，相对其父容器的坐标
    y: 100,
    width: 100,                 //矩形的宽度
    height: 100,                //矩形高度
    fill: 'gold',               //矩形填充的颜色
    stroke: 'navy',             //矩形描边的颜色
    strokeWidth: 4,             //填充宽度
    opactity: .2,               //矩形的透明度
    scale: 1.2,                 //矩形的缩放 1：原来大小
    rotation: 30,               //旋转的角度，是deg不是弧度。
    cornerRadius: 10,           //圆角的大小（像素）
    id: 'rect1',                //id属性，类似dom的id属性
    name: 'rect',
    draggable: true             //是否可以进行拖拽
});

//创建一个组
var group = new Konva.Group({
    x: 40,
    y: 40,
});
group.add( rect );  //把矩形添加到组中

//第四步： 把形状放到层中
layer.add( group ); //把组添加到层中
layer.draw();       //绘制层到舞台上
```
## 5.3 Konva 的动画系统
### 5.3.1 tween 对象
- tween 是控制 Konva 对象进行动画的核心对象。
- tween 可以控制所有数字类型的属性进行动画处理，比如：x, y, rotation, width, height, radius, strokeWidth, opacity, scaleX 等
```js
var tween = new Konva.Tween({
    node: rect,             //要进行动画的Konva对象
    x: 300,                 //要进行动画的属性
    opacity: .8,
    duration: 1,            //持续时间
    easing: Konva.Easings.EaseIn, //动画的动画效果
    yoyo: true,             //是否进行循环播放的设置
    onFinish: function() {
        //动画执行结束后，执行此方法
    }
});
tween.play();   //启动动画
```
- tween 的控制方法
      tween.play(), //播放动画<br>
      tween.pause(), //暂停动画<br>
      tween.reverse(), //动画逆播放<br>
      tween.reset(), //重置动画<br>
      tween.finish(), //立即结束动画
- tween 的缓动控制选项
      Konva.Easings.Linear //线性<br>
      Konva.Easings.EaseIn //缓动，先慢后快<br>
      Konva.Easings.EaseOut //先快后慢<br>
      Konva.Easings.EaseInOut //两头慢，中间快<br>
      Konva.Easings.BackEaseIn //往回来一点，然后往前冲，汽车启动类似<br>
      Konva.Easings.BackEaseOut<br>
      Konva.Easings.BackEaseInOut<br>
      Konva.Easings.ElasticEaseIn //橡皮筋 <br>
      Konva.Easings.ElasticEaseOut<br>
      Konva.Easings.ElasticEaseInOut<br>
      Konva.Easings.BounceEaseIn //弹跳；<br>
      Konva.Easings.BounceEaseOut<br>
      Konva.Easings.BounceEaseInOut<br>
      Konva.Easings.StrongEaseIn //强力<br>
      Konva.Easings.StrongEaseOut<br>
      Konva.Easings.StrongEaseInOut
### 5.3.2 动画 to 的使用
- to 就是对 tween 的封装，比较简单好用。
```js
var rect = new Konva.Rect({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red'
});
layer.add(rect);
layer.draw();

//动画系统
rect.to({
    x: 100,
    y: 100,
    opactity: .1,
    duration: 3,
    onFinish: function() {

    }
});
```
### 5.3.3 Animate 的应用
- Animation 动画，实际上就是浏览器通知开发者进行绘制，并提供当前的时间
```js
var anim = new Konva.Animation(function(frame) {
    //动画系统提供的frame有三个属性可以使用：
    var time = frame.time, // 动画执行的总时间
        timeDiff = frame.timeDiff, // 距离上一帧的时间
        frameRate = frame.frameRate; // 帧率（既1000/间隔时间）
    //动画的动作
}, layer);
anim.start();//启动动画
//anim.stop();//结束动画
```
### 5.3.4 循环播放动画的实现
```js
//总体思路，使用tween 配合onFinish事件中重新播放动画，达到循环播放的效果
var loopTween = new Konva.Tween({
  node: star, //设置要表现动画的 Konva对象
  rotation: 360, //旋转360度
  duration: 2, //动画持续时间
  easing: Konva.Easings.Linear,
  onFinish: function() {
    // this === loopTween //true
    this.reset(); //重置动画
    this.play(); //重新播放动画
  }
});
loopTween.play();
```
### 5.3.5 回放且循环播放动画
- yoyo 属性可以进行对动画进行播放完后，回放当前动画，并持续循环来回切换播放。
```js 
rect.to({
  duration: 2,
  scale: 1.5,
  yoyo: true // 此设置也可以用于 tween
});
```
## 5.5 Konva 的选择器
- ID 选择法：stage.find('#id'); //此方法返回的是一个数组
- name 选择法：group.findOne('.name');//返回一个 Konva 对象
- type 选择法： group.find('Circle');//查找所有的圆形 Konva 对象
```js
//组中查找圆形的Konva对象
groupCircle.find('Circle').each(function(circle, index) {
  circle.setZIndex(3 - index);
});
```
## 七、Canvas 优化
```js
<!-- requestAnim shim layer by Paul Irish -->
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
var canvas, context, toggle;

init();
animate();

function init() {
    canvas = document.createElement( 'canvas' );
    canvas.width = 512;
    canvas.height = 512;
    context = canvas.getContext( '2d' );
    document.body.appendChild( canvas );
}

function animate() {
    requestAnimFrame( animate );
    draw();
}

function draw() {
    var time = new Date().getTime() * 0.002;
    var x = Math.sin( time ) * 192 + 256;
    var y = Math.cos( time * 0.9 ) * 192 + 256;
    toggle = !toggle;
    context.fillStyle = toggle ? 'rgb(200,200,20)' :  'rgb(20,20,200)';
    context.beginPath();
    context.arc( x, y, 10, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();
}
```
### 参考：
https://www.cnblogs.com/fly_dragon/p/10416040.html


