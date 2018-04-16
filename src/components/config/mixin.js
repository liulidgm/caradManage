
import $ from 'jquery'
// import {checkProvinces} from 'service/getData'
export const mixinUtils = {
  component:{
    
  },
  methods: {

    goBack(){
      window.history.go(-1);
    },
    errorMsg(msg){
    	this.$message({
			showClose: true,
			message: msg,
			type: 'error'
		});
    }
  }
}
