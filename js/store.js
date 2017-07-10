var STORAGE_KEY = 'comps-list'
var Store = (function(){
      return {
        fetch:function(){
          return JSON.parse(window.localStorage.getItem( STORAGE_KEY) || '[{}]')
        },
        save: function(comps){
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comps))
        }
      }
    })()