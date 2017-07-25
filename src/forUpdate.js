/**
 * Created by Dejavue on 2017/7/19.
 */
export default (obj,high,vue)=>{
    let initX,initY,touch,disX,disY,seeHeight;
    seeHeight=document.documentElement.clientHeight;
    obj.val.addEventListener('touchstart',function (event) {
        if(obj.isMoving){
          return;
        }

        if (event.targetTouches.length == 1 ) {
          touch = event.targetTouches[0];
          initX=touch.pageX;
          initY=touch.pageY;
          if(initY>seeHeight){
            return;
          }
        }
      },false)
    obj.val.addEventListener('touchmove',function (event) {

      if(obj.isMoving){
        return;
      }
      obj.isMoving=true;
        touch = event.targetTouches[0];
        if(touch.pageY>seeHeight){
          return;
        }
        disX=touch.pageX-initX;
        disY=touch.pageY-initY;
        if(disY>0 && touch.pageY<60){
          high.style.top=disY+'px';
        }else if(disY>0 && touch.pageY>60){
          high.style.top='60px';
        }else{
          obj.isMoving=false;
        }
      },false)
    obj.val.addEventListener('touchend',function (event) {
      if(obj.isMoving){
        touch = event.changedTouches[0];
        if(touch.pageY>seeHeight){
          return;
        }
        obj.isMoving=false;
        high.style.top='-9vh';
        vue.getAllArticle();

      }


    },false)

}
