# refreshcomponent
an refresh component for javascript

  目前只支持编写的一种风格，本人canvas玩的不6，平常工作比较忙，业余时间才能研究，画不同的效果，欢迎各位给出各种建议

  使用方法：
     1、MyScrollComponent(options,callback);


     2、options（JSON）
        options      type      description                                   
        id          string     the element of your list container 
        duration    number     the animation duration of the refreshing(default:0.4)
        fontsize    number     the fontsize of the font(default:15)
        style       string     the style of the refreshing component(default:ANDROID_1)


     3、callback(function)
      the callbackfunction of the component when refreshing success,and you can use 
      stop() to stop refreshing
      example:  function(e){e.stope()};