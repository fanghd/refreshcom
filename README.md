# refreshcomponent
an refresh component for javascript


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
