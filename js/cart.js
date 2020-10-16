window.onload = function () {
   let getJSON = function(url, callback){
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';

      xhr.onload = function(){
         let status = xhr.status;
         if (status == 200){
            callback(null, xhr.response);
         }
         else{
            callback(status, xhr.response);
            console.log(callback(status, xhr.response));
         }
      };
      xhr.send();
   }
   getJSON('https://spreadsheets.google.com/feeds/list/1PEfrN0lE3LlOaKiTs_2FoOVqlUeFPd2_R6iWbX8uHfI/od6/public/values?alt=json', function(err, data){
      if (err !== null){
         console.log('ERROR: ' + err);
      }
      else{
         data = data.feed.entry;
         console.log(data);
         document.querySelector('.shop-container').innerHTML = showGoods(data);
      }
   });

   function showGoods(data){
      let itemData = '';
      for (i = 0; i < data.length; i++) {
         if(data[i].gsx$show.$t != 0){
            itemData += '<div class="col-lg-3 col-md-6 text-center"><div class="goods"><h5>' + data[i].gsx$name.$t + '</h5><img src="' + data[i].gsx$img.$t + '" alt="img"><p class="cost">' + data[i].gsx$cost.$t + '</p><p class="amount"></p><p><button class="good-button btn btn-success" value="' + data[i].gsx$id.$t + '">Buy</button></p></div></div>'
         }
      }
      return itemData;     
   }







}