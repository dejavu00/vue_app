/**
 * Created by Dejavue on 2017/7/12.
 */
export default (vue)=>{
  vue.prototype.webConfig={
    initIp:'mta.bixiuko.com/forstus/web',

    // Port:8881,
    getPath(path){
      return `http://${this.initIp}/${path}`;
    }

  }
}

