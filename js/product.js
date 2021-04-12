let productShow = document.querySelector('.product');
let productId = window.location.search.replace( '?', '');;
let goodsArray = {};
let cart = {};


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
      goodsArray = arrFilter(data);
      console.log(data);
      console.log(goodsArray);
      showGood();
   }
});

function arrFilter(arr){
   let out = {};
   for (let i = 0; i < arr.length; i++) {
      let temp = {};
      temp['id'] = arr[i].gsx$id.$t;
      temp['name'] = arr[i].gsx$name.$t;
      temp['image'] = arr[i].gsx$img.$t;
      temp['cost'] = arr[i].gsx$cost.$t;
      out[temp['id']] = temp;
   }
   return out;
}


function showGood(){
   productShow.innerHTML = '<img src="' + goodsArray[productId].image + '">' + '</img>';
}