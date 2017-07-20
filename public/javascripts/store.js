//var STORAGE_KEY = 'comps-list'
var Store = (function(){
      return {
        fetch:function(key, defaults){
          return JSON.parse(window.localStorage.getItem(key) || defaults)
        },
        save: function(key,data){
          window.localStorage.setItem(key, JSON.stringify(data))
        }
      }
    })()