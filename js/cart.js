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
      console.log(data);
      if (err !== null){
         console.log('ERROR: ' + err);
      }
      else{
        // data = data['feed']['entry'];
         //data = data.feed.entry;
         console.log(data);
         document.querySelector('.shop-container').innerHTML = showGoods(data);
         console.log(data[0].content.$t);
      }
   });

   function showGoods(data){
      for (let i = 0; i < data.length; i++) {
         '<div class="col-lg-3 col-md-2"><div class="goods"><h5>' + data[i].content.$t['name'] + '</h5><img src="" alt=""><p class="cost"></p><p class="amount"></p></div></div>'
         


      }
         


   }







}