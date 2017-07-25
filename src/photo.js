export  default
  (obj,vm)=> {
            let _this = vm;
            navigator.camera.getPicture(onSuccess, onFail, {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              encodingType:0
            });

            function onSuccess(imageData) {

              obj.src = "data:image/jpeg;base64," + imageData;
              _this.image = obj.src;
              _this.fileType='JPEG ';
            }

            function onFail(message) {
              alert('Failed because: ' + message);
            }
          }

