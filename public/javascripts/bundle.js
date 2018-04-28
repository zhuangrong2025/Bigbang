 
/**
 *****************自定义组件*****************
 */
var compMethods = {
        increment: function(event){
          this.$emit('increment', event)   //触发v-on:increment，并传回当前对象event
        },
        drag: function(event){
          this.$emit('drag', event) 
        },
        dragover: function(event){
          this.$emit('dragover', event) 
        },
        dragend: function(event){
          this.$emit('dragend', event) 
        }
    }
/*
 * 表单组件 
 */
//button
var ButtonComp = {
      props: ["comp", "id"],
      template: `<a :href="comp.linkto + '.html'" class="sm-btn" :style="{'transform': 'translate(' + comp.x + 'px,' + comp.y + 'px)'}" :class="[comp.class, comp.size, comp.size == '' ? '' : comp.align ]"  data-comp="drag-div" :data-case="comp.caseid" :id="id" :name="comp.inputname" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend" v-on:click.prevent = "increment" >
{{ comp.text }}
</a>
`,
      methods: compMethods
    }

//input  
var InputComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" v-on:click = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge, border: comp.isBorder}">
    <transition-group name="list-complete" tag="div"  :key="comp.tgId">
      <div class="sm-cell list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells" >
        <label v-if="comp.cells[index].tag != ''" class="sm-cell-label">{{comp.cells[index].tag}}</label>
        <div>
          <input type="text" :value="comp.cells[index].placeholder" :placeholder="comp.cells[index].placeholder" :readonly="!comp.cells[index].readonly">
        </div>
        <a class="cell-unit" v-if="comp.cells[index].unit != ''">{{comp.cells[index].unit}}</a>
      </div>
    </transition-group>
  </div>
</div>
`,
      methods: compMethods
    }

//buttonbar
var ButtonbarComp = {
      props: ["comp", "id"],
      template: `<div v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
<transition-group name="list-complete" tag="div" class="sm-flex" :key="comp.tgId">
    <div class="sm-flex-item list-complete-item" :key="cell.id"  v-for="(cell, index) in comp.cells">
      <a :href="comp.cells[index].linkto | isLink" class="sm-btn" :class="[comp.cells[index].class, comp.barSize]">{{cell.text}}</a>
    </div>
  </transition-group>
</div>
`,
      methods: compMethods
}
//list
var ListComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" :name="comp.inputname" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}">
    <transition-group name="list-complete" tag="div"  :key="comp.tgId">
      <a :href="comp.cells[index].linkto | isLink" class="sm-cell list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells" >
        <i :class="comp.cells[index].icon" :style="{color: comp.cells[index].colorSelected}"></i>
        <div>{{comp.cells[index].tag}}<em class="description" v-if=" comp.cells[index].description != ''">{{comp.cells[index].description}}</em></div>
        <span>{{comp.cells[index].tip}}</span>
      </a>
    </transition-group>
  </div>
</div>
`,
      methods: compMethods
    }

//checkbox 
var CheckboxComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}">
    <transition-group name="list-complete" tag="div" :key="comp.tgId">
      <label class="sm-cell list-complete-item" :class="{reverse: comp.isReverse}" :key="cell.id" v-for="(cell, index) in comp.cells" >
        <div>{{comp.cells[index].item}}</div><input type="checkbox" :name="comp.inputname" :value="comp.cells[index].item" :checked="!comp.cells[index].checked" class="sm-checkbox">
      </label>
    </transition-group>
  </div>
</div>
`,
      methods: compMethods
    }

//radio 
var RadioComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}">
    <transition-group name="list-complete" tag="div" :key="comp.tgId">
      <label class="sm-cell list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells" >
        <div>{{comp.cells[index].item}}</div><input type="radio" :name="comp.inputname" :value="comp.cells[index].item"  :checked="!comp.cells[index].checked" class="sm-radio">
      </label>
    </transition-group>
  </div>
</div>
`,
      methods: compMethods
    }

//textarea 
var TextareaComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" :name="comp.inputname"  v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}">
    <div class="sm-cell" v-for="(cell, index) in comp.cells" >
      <div>
        <textarea class="sm-textarea" rows="3" :value="comp.cells[index].control" placeholder="请输入文本内容"></textarea>
      </div>
    </div>
  </div>
</div>
`,
      methods: compMethods
    }
//switch 
var SwitchComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}">
    <transition-group name="list-complete" tag="div" :key="comp.tgId">
      <label class="sm-cell sm-cell-switch list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells" >
        <div>{{comp.cells[index].item}}</div>
        <span><input type="checkbox" :name="comp.inputname" class="sm-switch" :checked="!comp.cells[index].checked"></span>
      </label>
    </transition-group>
  </div>
</div>
`,
      methods: compMethods
}

//select 
var SelectComp = {
      props: ["comp", "id"],
      template: `<div class="sm-cells-wrap" :name="comp.inputname" v-on:click = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-cells-title" v-if="comp.isShow">{{comp.title}}</div>
  <div class="sm-cells" :class="{ merge: comp.isMerge}" >
    <transition-group name="list-complete" tag="div" :key="comp.tgId">
      <div class="sm-cell list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells">
        <label v-if="comp.cells[index].tag != ''" class="sm-cell-label">{{comp.cells[index].tag}}</label>
        <div class="sm-select">
            <select class="select"  v-model="comp.cells[index].selected" >
              <option selected>请选择...</option>
              <option :value="option" v-for="option in filterCells[index].options">{{option}}</option>
            </select>
        </div>
      </div>
    </transition-group>
  </div>
</div>
`,
      computed:{
        filterCells:function(){
          //v-for不能用过滤，通过计算属性实现过滤
          var cells = this.comp.cells
          var newCelss = []
          $.each(cells, function(i,cell){
            newCelss.push({"options": cell.options.split("-")})
          })
          return newCelss
          
        }
      },
      methods: compMethods
    }
/*
 * 基础组件 
 */
//html
var HtmlComp = {
      props: ["comp", "id"],
      template: ` 
                  <div class="html-box" v-on:click = "increment"  data-comp="drag-div" v-bind:id="id"  draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
                   <span v-html="comp.vcss"></span>
                   <span class="box-wp" v-html="comp.vhtml"></span>
                  </div>
                `,
      methods: compMethods
    }

//white-space
var SpaceComp = {
      props: ["comp", "id"],
      template: `<div class="sm-space" v-bind:style="{height: comp.height  + 'px'}"  v-on:click = "increment"  data-comp="drag-div" v-bind:id="id"  draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend"></div>`,
      methods: compMethods
    }

//panel zz
var PanelComp = {
      props: ["comp", "id"],
      template: `<div class="sm-panels" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <transition-group name="list-complete" tag="div" :key="comp.tgId">  
    <a :href="comp.cells[index].linkto | isLink" class="sm-panel list-complete-item" :class="{'reverse': comp.isReverse, 'radius': comp.isRadius}" :key="cell.id" v-for="(cell, index) in comp.cells">
      <figure v-if="comp.isFigure">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAIVBMVEX/qgD/3Zn/rgv/46j/6bv/vDT/wkb/2Yv/03r/tB7/y2PJaPMWAAAAwUlEQVQ4y2MYBTQCjIJYgABCGpueYSed7JyAR5rNVdUNjzRzAEMwHmkWBQYWcnQj7CbD5awFeP09RRyfNKcbewEeaeUFDOW4pZmkGBig2jGloVISOKUbQbRiAw5pLiMQzQTTvgJNOlmBAUk7h3ECijSbJ5CEa2cq1HRFkQ4JAJJw7coNDCETkKVLYSwmC2AAWTGA3IIZJVCdoChpxy7NZMXmChZagD1ClUsmgJW5YZdmqoTQMwZhJiJWmlDRMwpoAwDTPB0IZXoaBQAAAABJRU5ErkJggg==">
      </figure>
      <article>
        <h4>{{comp.cells[index].title}}</h4>
        <p>{{comp.cells[index].content}}</p>
      </article>
    </a>
  </transition-group>
</div>
`,
      methods: compMethods
}

//article
var ArticleComp = {
      props: ["comp", "id"],
      template: `<div class="sm-article" :class="{bgc: comp.isBg}" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <h3>{{comp.title}}</h3>
  <p>{{comp.content}}</p>
</div>
`,
      methods: compMethods
}

//grid
var GridComp = {
      props: ["comp", "id"],
      template: `<div v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <transition-group name="list-complete" class="sm-grids" :class="{'border-less': comp.isBorder, 'bg': comp.isBg }" :style="{'background-color': comp.isBg ? comp.bgSelected : ''}" tag="div" :key="comp.tgId">  
    <a :href="comp.cells[index].linkto | isLink" class="sm-grid list-complete-item" :class="comp.columns" :key="cell.id" v-for="(cell, index) in comp.cells">
      <i :class="comp.cells[index].icon"  :style="{'background-image': comp.cells[index].colorSelected !='' ? '-webkit-linear-gradient(80deg,' + comp.cells[index].colorSelected + ' 60%,#fff)' : '' ,'font-size': +  comp.iconSize + 'px'}"></i>
      <span>{{comp.cells[index].text}}</span>
    </a>
  </transition-group>
</div>
`,
      methods: compMethods
}

//alert
var AlertComp = {
      props: ["comp", "id"],
      template: `<div class="sm-alert" :class="[comp.type]" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
    <i  v-if="comp.isIcon" :class="'sm-icon-' + comp.type"></i>
    <span>{{comp.message}}</span>
</div>
`,
      methods: compMethods
}

/*
 * 事件组件 
 */
//actionSheet
var ActionsheetComp = {
      props: ["comp", "id"],
      template: ` 
                  <div>
                    <div class="sm-mask" :data-case="comp.caseId" :class=" {toggle: comp.isToggle}"></div>
                    <div class="sm-actionSheet" :data-case="comp.caseId" :class=" {toggle: comp.isToggle}" >
                      <h3>{{comp.title}}</h3>
                      <ul>
                        <li>{{comp.menu}}</li>
                        <li>示例菜单一</li>
                        <li>示例菜单一</li>
                      </ul>
                      <a href="javascript:;" class="action-cancel">取消</a>
                    </div>
                    <div v-html="comp.script"></div>
                  </div>
                `
    }
//toast
var ToastComp = {
      props: ["comp", "id"],
      template: ` 
                  <div class="sm-toast" :data-case="comp.caseId" :class=" {toggle: comp.isToggle}">
                    <div>
                      <i :class="comp.icon"></i>
                      <p>{{comp.tips}}</p>
                    </div>
                    <div v-html="comp.script"></div>
                  </div>
                `
    }

/*
 * 导航栏、标签栏、搜索组件
 */
//header
Vue.component('sm-header', {
  props: ["title","isback"],
  template: `
            <div class="sm-header">
              <a class="icon-back" href="javascript:history.go(-1)" v-if="isback" ></a>
              {{title}}
</div>
            `
  })

//tabbar
Vue.component('sm-tabbar', {
  props: ["tabbar"],
  template: `
            <div class="sm-tabbar">
              <a :href="tab.linkto + '.html'" v-for="(tab, index) in tabbar.items.slice(0, tabbar.number)" :class ="{active: tabbar.items[index].active != ''}" >
                <i :class="tab.icon"></i>
                <i :class="tab.active"  v-if=" tabbar.items[index].active != ''"></i>
                <span>{{tab.title}}</span>
              </a>
            </div>
            `
})

//navbar 
var NavbarComp = {
      props: ["comp", "id"],
      template: `<div v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="sm-navbar" :data-case="comp.tgId"> 
    <transition-group name="list-complete" tag="ul" :key="comp.tgId"> 
      <li class="list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells">{{cell.text}}</li>
    </transition-group>
  </div>
  <div :data-panel="comp.tgId"  v-for="n in comp.cells.length" style="display:none">第{{n}}选项卡内容</div>
  <div v-html="comp.script"></div>
</div>
`,
      methods: compMethods
}


//searchbar
var SearchbarComp = {
      props: ["comp", "id"],
      template: `<div class="sm-searchbar" :data-case="comp.tgId" :class="{'bg': comp.isBg }"  :style="{'background-color': comp.isBg ? comp.bgColor : ''}" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <label></label>
  <div>
    <i class="sm-icon-search"></i>
    <input type="text" placeholder="搜索">
    <button>取消</button>
  </div>
  <div v-html="comp.script"></div>
</div>
`,
      methods: compMethods
}

//swiper 
var SwiperComp = {
      props: ["comp", "id"],
      template: `<div v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <div class="swiper-container sm-swiper" :class="[comp.isText ? comp.textAlign:'']" :data-case="comp.tgId">   
     <div class="swiper-wrapper">
        <div class="swiper-slide"  v-for="(cell, index) in comp.cells">
          <img :style="{'background-image':'url(' + cell.img + ')'}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1IAAAFeAQMAAAC1tbwWAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAADtJREFUeNrtwTEBAAAAwiD7p7bGDmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQcJOoAAGLrjCzAAAAAElFTkSuQmCC">
          <span v-if="comp.isText">{{cell.text}}</span>
        </div>
      </div>
     <div class="swiper-pagination"></div>
  </div>
  <div v-html="comp.script"></div>
</div>
`,
      methods: compMethods
}

//avatar 
var AvatarComp = {
      props: ["comp", "id"],
      template: `<div class="sm-avatar" :class="[comp.avatarAlign, comp.fontColor, comp.size]" :style="{'background-image':'url(' + comp.bgImage + ')', 'background-color': comp.bgColor}" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <i style="background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAKlBMVEU4YaT///9AZ6i2xd7o7fXQ2ur3+fymuNZfgLaSqM15lMJMca3AzeLZ4e7wt24ZAAABj0lEQVRYw+3Vu0rDUBjA8Ritt7p8GmMDDQTUTaFRUHCLk3YyvoGDt61VUMQlXZwVRBxTcHCsb6A4ulhHn0a3NvluOZNS+p9/Q07O5bOGDbMsu27Ej1IT3fVMdAgfBvoO3Oviug3gbgVF9Qv85rxfnq9vXj2regT6OnxU9Dhk+g6UL8lWV/5JrjVJR3ntd3g8DagvXpewrvK6BbiU1U1CbwuLxHkcngQih9NTQJUweobUDUaPkfpTOCW4WeF34yo0tpukngtIvQx0+8yFp6tqe6P/8QlWN4TjitsbID3K6ppy4fWraUcMdsiDcsPoE/padknsJ/xThUtNXgjH6PVZMHrZKqwuKRupL1OYzjHC8xZfS9wa/bbdWkIxuu9Sq2jsSNlxdo3KzF/M6DNL6QmNYin7nsfi/az9kcaz6rWAXkJjWKj81tv2joovoNdxoOL+TgMNF+blDci3G+gYc4xDgOL8Aeh2KLyCmHQ3Q1Z7JqMB3IQ6HgZjqi3oivjZ+qscCdpH+kDQLtIg9Y91oVX+AC7VkmZIz3QGAAAAAElFTkSuQmCC);"></i>
  <span>{{comp.userName}}<em>{{comp.userInfo}}</em></span>
</div>
`,
      methods: compMethods
}
//flextext 
var FlextextComp = {
      props: ["comp", "id"],
      template: `<div  v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <transition-group name="list-complete" tag="div"  class="sm-flex flex-text" :class="[comp.isBg ? 'bg' : '', comp.isDivider ? 'divider' : '']" :key="comp.tgId"> 
    <div class="sm-flex-item list-complete-item" :key="cell.id" v-for="(cell, index) in comp.cells" :style="{'background-color': comp.isBg ? comp.bgColor : ''}">
      <span v-if="cell.one != ''">{{cell.one}}</span>
      <em v-if="cell.two != ''">{{cell.two}}</em>
      <label v-if="cell.three != ''">{{cell.three}}</label>
    </div>
  </transition-group>
</div>
`,
      methods: compMethods
}

//image 
var ImageComp = {
      props: ["comp", "id"],
      template: `<div class="sm-image"  :class="{noneBg: comp.url!='' }" v-on:click.prevent = "increment" v-bind:id="id" data-comp="drag-div" draggable="true" v-on:dragstart.stop="drag" v-on:dragover.prevent="dragover" v-on:dragend.prevent="dragend">
  <img v-bind:src="comp.url" v-bind:style="{'width': comp.size + '%'}">
</div>
`,
      methods: compMethods
}
/**
 *****************利用自定义指令处理高亮css代码 *****************
 */
Vue.directive('codeHighlight', function (el, binding) {
  var code = binding.value
    el.innerHTML = codeHightLight(code)
})
/**
 *****************自定义字符处理过滤器--属性面板字符串过滤*****************
 */
 Vue.filter( 'propname' , function(value) {
    return value.substring(value.length-4, 0);
  });


/**
 *****************自定义字符处理过滤器--page链接过滤如果是#，那么就不加.html后缀*****************
 */
 Vue.filter( 'isLink' , function(value) {
    if( value != "#"){
      return value + ".html";
    }
  });

/**
 *****************自定义指令--输入框数值加减 *****************
 */
Vue.directive('spinner', function(el, binding){
    el.onclick = function(){
      if( binding.arg == "inc" ){
        binding.value = binding.value + 1
        $(el).prev().val(binding.value)
        $(el).prev().trigger("click")
      }else{
        binding.value = binding.value - 1
        $(el).prev().prev().val(binding.value)
        $(el).prev().prev().trigger("click")
      }
      
    }
})
/**
 *****************创建vue实例 *****************
 */
    
var vm = new Vue({
  el: '#app',
  components: {
    btnComp: ButtonComp,
    inputComp: InputComp,
    buttonbarComp: ButtonbarComp,
    listComp: ListComp,
    checkboxComp: CheckboxComp,
    textareaComp: TextareaComp,
    radioComp: RadioComp,
    switchComp: SwitchComp,
    selectComp: SelectComp,
    htmlComp: HtmlComp,
    spaceComp: SpaceComp,
    panelComp: PanelComp,
    articleComp: ArticleComp,
    gridComp: GridComp,
    navbarComp: NavbarComp,
    searchbarComp: SearchbarComp,
    swiperComp: SwiperComp,
    avatarComp: AvatarComp,
    flextextComp: FlextextComp,
    actionsheetComp: ActionsheetComp,
    alertComp: AlertComp,
    imageComp: ImageComp,
    toastComp: ToastComp
  },
  data:{
    compIdx: 0,
    comps: [{}],
    panelProp: "pageComp",
    classes:["primary", "warning", "outline-primary", "outline-warning", "disabled", "link-text", "link-text-primary"],
    themes: Store.fetch('themes-list', '{"primary": "#008AD5", "warning": "#E64340", "success": "#09BB07", "secondary": "#f80", "line": "#dedede", "grayLight": "#999", "bodyBg": "#f7f7f9", "headerBg": "#fff", "tabbarBg": "#f7f7f9", "textColor": "#000", "borderRadius": "5px"}'),
    pages: Store.fetch('pages', '[{}]'),
    pageIdx: Store.fetch('pageIdx', 0),
    generateHtml: Store.fetch('html-list', '[{}]'),
    tabbar: Store.fetch('tabbar', '{"number": 4,"items": [{"icon": "icon-homepage", "title": "Home", "linkto": "#", "active": ""},{"icon": "icon-label", "title": "Category", "linkto": "#", "active": ""},{"icon": "icon-service", "title": "Service", "linkto": "#", "active": ""},{"icon": "icon-people", "title": "User", "linkto": "#", "active": ""}]}'),
    iconfont: Store.fetch('iconfont', '["//at.alicdn.com/t/font_378141_8cl3a5vspzo7p66r.css"]'),
    undo: {},
    isPreview: false,
    caseTypes:["none", "actionsheet", "toast"],
    caseIdx: null,
    jsonUrl: "http://10.168.1.91:3000/cell.json",
    themeName: Store.fetch('theme-name', '["Default"]')
    
  },
  /*监听data*/
  watch: {
    comps: {
       handler: function(newVal){
         //每次添加组件元素或改变属性时，把comps数据存到localstorage，key为page****
         if(this.pages.length > 1){
           window.localStorage.setItem(this.pages[this.pageIdx].id, JSON.stringify(newVal))
         }
       },
       deep: true
    },
    themes: {
       handler: function(newVal){
          Store.save('themes-list', newVal)
       },
       deep: true
    },
    themeName: {
       handler: function(newVal){
          Store.save('theme-name', newVal)
       },
       deep: true
    },
    pages: {
       handler: function(newVal){
          Store.save('pages', newVal)
       },
       deep: true
    },
    pageIdx: {
       handler: function(newVal){
          Store.save('pageIdx', newVal)
       },
       deep: true
    },
    generateHtml: {
       handler: function(newVal){
          Store.save('html-list', newVal)
       },
       deep: true
    },
    tabbar: {
       handler: function(newVal){
          Store.save('tabbar', newVal)
       },
       deep: true
    },
    iconfont: {
       handler: function(newVal){
          Store.save('iconfont', newVal)
       },
       deep: true
    }
  },
  mounted:function() {
    var _this = this
    this.$nextTick(function () {
      
      
      // 初始化：判断localstorage上有没有key，如果没有对应的key就加载初始页，如果有key，就不加加载默认页，防止page都被删除后，又加载了默认页面
      var lsPageIdx = Store.fetch("pageIdx", null)
      if( lsPageIdx == null){
        if(this.pages.length < 3){
          //初始化pages
          this.pages = [{"name":"欢迎页","id":"page1001","title":"欢迎页","isHeader":true,"isBack":false,"isTabbar":false},{"name":"示例","id":"page1002","title":"示例","isHeader":true,"isBack":true,"isTabbar":false},{}]

          //初始化"欢迎页"的comps数据, 延迟100ms后向comps添加数据
          setTimeout(function(){ 
             _this.comps = [{"name":"htmlComp","vhtml":"<div class='welcome'>\n  <h3>\n<p>欢迎使用</p></h3>\n\n</div>","vcss":"<style>\n.welcome h3{\n  text-align:center;\n  font-size:20px;\n}\n.welcome{\n  padding:80px 0 100px;\n  margin-bottom:15px;\n  background-color:#fff\n}\n</style>"},{"name":"btnComp","class":"primary","linkto":"示例","text":"查看示例","inputname":"","caseid":"caseid100","type":"none"},{}]
          },100)

          //初始化"示例"的localstorage的数据，在切换到此page时替换comps中的数据
          window.localStorage.setItem("page1002", JSON.stringify([{"name":"inputComp","title":"个人信息","inputname":"","cells":[{"tag":"姓名","control":"","button":""},{"tag":"手机号","control":"","button":"验证码"}],"isMerge":false,"isShow":true},{}]))

          //初始化generateHtml； to fixed:在page1002的html内容要再update钩子函数中生成，在切换page时自动update，首次加载时如果没有切换page，直接点击preview或download，不会生成“示例”页的html
          this.generateHtml = [{"getHtml":"","getCss":""},{"getHtml":"","getCss":""},{}]

        }
      }
      
      //根据pageIdx初始化comps: 从localstorage的key = page****中获取数据,
      if(this.pages[this.pageIdx].id){
        this.comps  = Store.fetch(this.pages[this.pageIdx].id, '[{}]')
      }
    })
  },
  
  methods:{

    //删除组件
    removeComp(){
      //undo:存储删除的comp信息
      this.undo = {}
      this.undo['type'] = "undoComp"
      this.undo['index'] = this.compIdx
      this.undo['compinfo'] = this.comps[this.compIdx]
      
      //删除相关联的事件
      if(this.comps[this.compIdx].caseid){
        this.caseDel(this.comps[this.compIdx].caseid)
      }
      this.comps.splice(this.compIdx,1)
      $(".select-box").hide()
    },

    //隐藏select-box
    hideSelBox(){
      $(".select-box").hide()
    },

    //选择组件
    selectComp(event, obj){
      var ele = $(event.target)
        
      if(ele.parents("[data-comp=drag-div]")[0]){ //捕获html片段的父元素,data-comp="drag-div"可以选中这个组件所有
        ele = ele.parents("[data-comp=drag-div]")
      } 
      var eleScrollTop = $(".sm-container").scrollTop()
      var marginTop = ele.css("margin-top") 
      marginTop = marginTop.substring(0, marginTop.length - 2)
      var eleTop = ele.position().top + eleScrollTop + parseInt(marginTop) //position的位置 + margin-top的值 + scrolltop，才是元素实际的top
      $(".select-box").show().css({top: eleTop, height: ele.outerHeight() + "px"})
      
      this.compIdx = this.comps.indexOf(obj)
      //选中组件的样式
      this.selectedCls = this.comps[this.compIdx].class
      
      //切换属性面板
      this.panelProp = this.comps[this.compIdx].name
      
      //选择对应的caseComp的id
      this.caseidSet(this.comps[this.compIdx].caseid)
      
    },
    //属性展开收缩
    toggleCls(event){
      var ele = $(event.target)
      ele.parents(".pro-item").toggleClass("category-toggle")
    },
    
    //监听html编辑器文本框滚动 
    codeScroll(event){
      var ele = $(event.target)
      var domsctop = ele.scrollTop()
      var domscleft = ele.scrollLeft()
      $(".codeMask").scrollTop(domsctop).scrollLeft(domscleft)
    },
    
    //html编辑框全屏
    fullscreen(){
      $(".content").toggleClass("fs-cnt")
      $(".property").toggleClass("fs-prop")
      $(".fullscreen").toggleClass("fs-reset")
      this.hideSelBox()
    },
    
    /*===========================
      * page列表操作 
      * 1、addPage： 新增page时comps和localstorage转换过程： 
      *** a：先在localstorage上新增一个page****的key，赋值[{}]
      *** b：延迟100ms后trigger  li，赋值this.comps即空的[{}], 触发了watch
      *** c：this.generateHtml增加一个对应的空元素
      *
    =============================*/
    addPage(){
      //通过pages的length来判断
      var currentPage 
      if(this.pages.length > 1){
        currentPage = this.pageIdx + 1
        var ele = $(".page-list li").eq(this.pageIdx)
        setTimeout(function(){ 
          ele.next().trigger("click") 
        },100)
      }else{
        currentPage = 0
      }
      //新增一个page
      this.pages.splice(currentPage, 0, {
           name: "page" + this.pages.length,
           id: "page" + Math.round(Math.random() * 10000),
           title: "导航栏",
           isHeader: true,
           isBack: true,
           isTabbar: false
         })
      //新增localStorage上page****的空值，上面ele的trigger的时候需要到
      window.localStorage.setItem(this.pages[currentPage].id, JSON.stringify([{}]))  
      
      //新增generateHtml，需有pages对应个数
      this.generateHtml.splice(currentPage, 0, {
         getHtml: "",
         getCss: ""
       })
    },    
    selectPage(event, pageIdx){
      var ele
      if (event.target.nodeName == "LI"){
         ele = $(event.target)
      }else{
         ele = $(event.target).parents("li")
      }
      
      this.pageIdx = pageIdx
      var liId = ele.attr("id")
      
      this.compIdx = 0 //在切换page的时候compIdx要重置0，不然会找不到对应的组件属性，如.text .class .vhtml等
      this.comps = JSON.parse(window.localStorage.getItem(liId))  //注意：这里会触发comps的watch
      
      this.panelProp = "pageComp"
      $(".select-box").hide()
      
      //切换到其他page时，将caseComp弹出层隐藏
      $.each(this.comps, function(i, item){
        if(item.isToggle){
          item.isToggle = false;
        }
      })
      
    },    
    delectPageConfirm(){
      //undo:存储删除的page信息
      this.undo = {}
      this.undo['type'] = "undoPage"
      this.undo['index'] = this.pageIdx
      this.undo['pageinfo'] = this.pages[this.pageIdx]
      this.undo['pagecomps'] = Store.fetch(this.undo.pageinfo.id)
      this.undo['htmlinfo'] = this.generateHtml[this.pageIdx]
      
      //删除对应的generateHtml
      this.generateHtml.splice(this.pageIdx, 1)  
      
      //删除 page
      var ele = $(".page-list li").eq(this.pageIdx)
      this.pages.splice(this.pageIdx, 1)
      
      if(this.pageIdx == 0 && this.pages.length !=1){
        setTimeout(function(){ //如果没有延迟100ms，模拟器显示的是删除前的this.pages[0]的内容
          ele.trigger("click")
        },100)
      }else{
        ele.prev().trigger("click") //trigger对应的是LI元素，所以select中event.target也要是LI  
      }
      
      //删除 localstorage中的对应的page 内容    
      var liId = ele.attr("id") 
      window.localStorage.removeItem(liId)
      
      
      
      if(this.pages.length == 1){ //删除最后一个
        this.comps = [{}]
      }
      
      $("#modal-page").removeClass("in")
      $(".modal-mask").removeClass("in")
      
    },   
    delectPage(){
      $("#modal-page").addClass("in")
      $(".modal-mask").addClass("in")
    },
    getPageinfo(){
       var len = this.generateHtml.length - 1
       var pagecss = ""
       //将每个page的html赋值表单value
       $.each(this.generateHtml, function(i, item){
         
         if( i == len){
           return
         }else{
           if($("#phtml" + i)[0]){
             $("#phtml" + i).val(item.getHtml)
           }else{
             $("#form-cvs").append($('<input type="hidden" name="pagehtml">').attr({"value": item.getHtml,"id": "phtml" + i }))
           }
           pagecss += item.getCss
         }
       })
       //将每个page的"name"赋值表单value
       $.each(this.pages, function(i, item){
         if( i == len){
           return
         }else{
           if($("#pname" + i)[0]){
             $("#pname" + i).val(item.name)
           }else{
             $("#form-cvs").append($('<input type="hidden" name="pagename">').attr({"value": item.name,"id": "pname" + i }))
           }
        }
       })
       
       //所有的page的自定义的css合并在一起
       if($("#pcss")[0]){
         $("#pcss").val(pagecss)
       }else{
         $("#form-cvs").append($('<input type="hidden" name="pagecss">').attr({"value": pagecss, "id": "pcss"}))
       }
    },
    //export page info
    submit(){
       this.getPageinfo()
       Store.save('html-list', this.generateHtml)
       $("#form-cvs").submit()
    },
    //preview page
    preview(){
        
       $(".navbar a").toggleClass("active")
       this.isPreview = !this.isPreview
       if(this.isPreview == true){
         this.getPageinfo()
         var pagehtmlNew = []
         var pagenameNew = []
         var pagecssNew = []
         $.each($("[name=pagehtml]"), function(i, obj){
             pagehtmlNew.push(obj.value)
         })
         $.each($("[name=pagename]"), function(i, obj){
             pagenameNew.push(obj.value)
         })
         $.each($("[name=pagecss]"), function(i, obj){
             pagecssNew.push(obj.value)
         })

         $.ajax({
            type: 'post',
            url: 'http://10.168.1.91:3000/preview',
            data:{ pagehtmlNew: JSON.stringify(pagehtmlNew), pagenameNew: JSON.stringify(pagenameNew), pagecssNew: JSON.stringify(pagecssNew)},
            dataType: 'json',
            success: function(data){
              //接受服务器返回的数据
              //$("#preview-loading").html(data.some)
              $(".preview-loading").hide()
              $("#preview-frame").attr("src","http://10.168.1.91:3000/preview")
            }
         })
       }else{
           $("#form-cvs input[type=hidden]").remove()
         }
    },
    /*===========================
      iconfont select
    =============================*/
    chooseIcon(event){
      var $el = $(event.target)
      $("#modal-iconfont").addClass("in")
      $(".modal-mask").addClass("in")
     
      $.ajax({  
        type:"get",  
        url:"https:" + this.iconfont, 
        success:function(data){  
          var arr = data.match(/i(\S*)before/g); //get classname from character i to before
          var iconlist = ''
          arr.forEach(function(item){ 
           var cls = item.substring(0, item.indexOf(":"))
           iconlist +=  "<i class=" + cls  + "></i>"
          }) 
          //click icon
          $(".iconfont-show").html(iconlist).find("i").on("click", function(){
            var clsName = $(this).attr("class")
            
            $el.prev().val(clsName)
            $el.prev().trigger("click")
            
            $("#modal-iconfont").removeClass("in")
            $(".modal-mask").removeClass("in")
          })
        } 
      })
    },
    /*===========================
      undo:撤消
    =============================*/
    undoThis(){
      if(JSON.stringify(this.undo) == "{}"){
        return 
      }else{
        
        if(this.undo.type == "undoPage"){
          //undo:把删除的数据pages重新插入
          this.pages.splice(this.undo.index, 0, this.undo.pageinfo)
          this.generateHtml.splice(this.undo.index, 0, this.undo.htmlinfo)
          window.localStorage.setItem(this.undo.pageinfo.id, JSON.stringify(this.undo.pagecomps))
          /*删除的是第一个撤消时要trigger一下,新的第一个li,data更新有延迟*/
          if(this.undo.index == 0){
             setTimeout(function(){ 
              $(".page-list li").eq(0).trigger("click")
             },100)
          }
        }else if(this.undo.type == "undoComp"){
          //undo:把删除的数据pages重新插入
          this.comps.splice(this.undo.index, 0, this.undo.compinfo)
        }
        this.undo = {}
      }
    },
    /*===========================
      组件拖放排序
    =============================*/
    //拖动当前组件-在画布中拖动
    drag:function(event){
      dom = event.currentTarget
      domId = $(dom).attr("id")
      $clonedom = $(dom).clone(true)
      cloneId =  $clonedom.attr("id")
      isDragin = false
      $(".select-box").hide()
    },
    //拖动组件库-start-在组件库中开始拖
    dragItem:function(compType){
      //此函数作用主要是更新id和dom，没有实际作用
      switch(compType) {
          case "anyComp":
            dom = $('<div data-comp="drag-div" id="0" draggable="true"></div>')
            break
      }
      
      domId = $(dom).attr("id")
      $clonedom = $(dom).clone(true)
      cloneId = $clonedom.attr("id")
      isDragin = false
      $(".select-box").hide()
    },
    //拖动组件库-over-经过模拟器区域
    dragoverItem:function(){
      if(isDragin == false){
        isDragin = !isDragin
      }
    },
    dragleaveItem:function(){
      isDragin = false
    },
    //拖动组件库-end
    dragendItem:function(compType){
      var compObj
      var tgid = "tg" + Math.round(Math.random() * 10000)
      /*******表单组件*******/
      //button组件 
      var btnCompObj = {
                         name: "btnComp",
                         class: "primary",
                         linkto: "#",
                         text: "按钮" + this.comps.length,
                         inputname: "",
                         caseid: "caseid" + Math.round(Math.random() * 100),
                         type: "none",
                         align: "",
                         x: 0,
                         y: 0,
                         size: ""
                       }
      //input组件 
      var inputCompObj = {
                         name: "inputComp",
                         title: "委托信息",
                         inputname: "",
                         tgId: tgid,
                         cells: [
                           {tag: "证券代码", placeholder: "例: 01525 ", unit: "", readonly: true, id: tgid + "-1" },
                           {tag: "买入价格", placeholder: "请输入买入价格", unit: "元", readonly: true, id: tgid + "-2"}],
                         isMerge: false,
                         isBorder: false,
                         isShow: true
                       }
      
      //buttonbar组件
      var buttonbarCompObj = {
                         name: "buttonbarComp",
                         barSize: "",
                         tgId: tgid,
                         cells: [{text: "确定", class: "primary", linkto:"#", id: tgid + "-1"},{text: "取消", class: "primary", linkto:"#", id: tgid + "-2"}]
                         
                       }
      
      //list组件
      var listCompObj = {
                         name: "listComp",
                         title: "会员信息",
                         inputname: "",
                         colors: ["#1D8FE1","#F29402","#FF7070","#5D52E8","#0EA39C","#EE7116","#65BB12","#F15A4A","#999","#555"],
                         tgId: tgid,
                         cells: [
                           {tag: "会员特权", description: "消费获积分累加权限", tip: "", icon: "icon-select", linkto: "#", colorSelected: "#1D8FE1", id: tgid + "-1"},
                           {tag: "会员认证", description: "", tip: "已认证", icon: "icon-integral", linkto: "#", colorSelected: "#F29402", id: tgid + "-2"}],
                         isMerge: false,
                         isShow: true
                       }
      //checkbox组件
      var checkboxCompObj = {
                         name: "checkboxComp",
                         title: "您去过的城市？",
                         inputname: "city",
                         tgId: tgid,
                         cells: [{item: "福州", checked: true, id: tgid + "-1"},{item: "厦门", checked: true, id: tgid + "-2"},{item: "上海", checked: true, id: tgid + "-3"}],
                         isMerge: false,
                         isShow: true,
                         rows: [{reverse: false, txt: "文字在左"}, {reverse: true, txt: "文字在右"}],
                         isReverse: false
        
                       }
      //radio组件
      var radioCompObj = {
                         name: "radioComp",
                         title: "您的性别？",
                         inputname: "sex",
                         tgId: tgid,
                         cells: [{item: "男", checked: true, id: tgid + "-1"},{item: "女", checked: true, id: tgid + "-2"}],
                         isMerge: false,
                         isShow: true,
        
                       }
      //textarea组件 
      var textareaCompObj = {
                         name: "textareaComp",
                         title: "标题",
                         inputname: "",
                         cells: [{control: ""}],
                         isMerge: false,
                         isShow: true,
        
                       }
      //switch组件 
      var switchCompObj = {
                         name: "switchComp",
                         title: "同步",
                         inputname: "synch",
                         tgId: tgid,
                         cells: [{item: "开启自动同步", checked: true, id: tgid + "-1"}],
                         isMerge: false,
                         isShow: true,
        
                       }
      //select组件 
      var selectCompObj = {
                         name: "selectComp",
                         title: "标题",
                         inputname: "lang",
                         tgId: tgid,
                         cells: [{tag: "语言", selected:"请选择...", options:"中文-英文", id: tgid + "-1"}],
                         isMerge: false,
                         isShow: true
                       }
      
      /*******基础组件*******/
      //html组件
      var htmlCompObj = {
           name: "htmlComp",
           vhtml: `<div class='box'>
请在右边编辑框中插入html,实时预览效果 →
</div>`,
           vcss: `<style>
.box{
  font-size: 12px;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border: 1px dashed #0cf;
}
</style>`
         }
      
      //space组件 
      var spaceCompObj = {
                         name: "spaceComp",
                         height: 15
                       }
      //panel组件  zz
      var panelCompObj = {
                         name: "panelComp",
                         isFigure: true,
                         isRadius: false,
                         tgId: tgid,
                         cells: [{title: "标题", content: "内容内容内容", linkto: "#", id: tgid + "-1"}],
                         rows: [{reverse: false, txt: "图片居左"}, {reverse: true, txt: "图片居右"}],
                         isReverse: false
                       }
      //article 组件
      var articleCompObj = {
                         name: "articleComp",
                         title: "文章的标题",
                         content: "这里显示多行内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
                         isBg: true,
                       }
      //grid 组件 
      var gridCompObj = {
                         name: "gridComp",
                         columns: "four",
                         isBg: false,
                         bgSelected: "",
                         isBorder: false,
                         colors: ["#1D8FE1","#F29402","#FF7070","#5D52E8","#0EA39C","#EE7116","#65BB12","#F15A4A","#999","#555"],
                         iconSize: 32,
                         tgId: tgid,
                         cells: [
                           {text: "账户", icon: "icon-addressbook", linkto: "#", colorSelected: "#1D8FE1", id: tgid + "-1"},
                           {text: "转账", icon: "icon-coupons", linkto: "#", colorSelected: "#F29402", id: tgid + "-2"},
                           {text: "信用卡", icon: "icon-headlines", linkto: "#", colorSelected: "#FF7070", id: tgid + "-3"},
                           {text: "缴费", icon: "icon-createtask", linkto: "#", colorSelected: "#5D52E8", id: tgid + "-4"}]
                       }
      //alert 组件
      var alertCompObj = {
                         name: "alertComp",
                         type: "info-circle",
                         message: "业务说明信息，提示信息",
                         isIcon: true
                       }
      //navbar 组件
      //脚本
      var navbarScript = `
                          <script>
$(".sm-navbar[data-case=${tgid}] li").eq(0).addClass("active")
$("[data-panel=${tgid}]").eq(0).show()
$(".sm-navbar[data-case=${tgid}] li").each(function(index){
  $(this).on("click", function(){
    $(this).addClass("active").siblings("li").removeClass("active")
    $("[data-panel=${tgid}]").hide()
    $("[data-panel=${tgid}]").eq(index).show()
  })
})
<\/script>
`
      var navbarCompObj = {
                         name: "navbarComp",
                         tgId: tgid,
                         script: navbarScript,
                         cells: [{text: "选项一", id: tgid + "-1"},{text: "选项二", id: tgid + "-2"},{text: "选项三", id: tgid + "-3"}]
                       }
      
      //searchbar 组件
      //脚本
      var searchbarScript = `
                          <script>
$(".sm-searchbar[data-case=${tgid}] > label").on("click",function(){
  $(this).hide()
  $(this).parent().find("input").focus()
})
$(".sm-searchbar[data-case=${tgid}] input").blur(function(){
  $(".sm-searchbar[data-case=${tgid}] > label").show()
  $(this).val("")
})
<\/script>

`
      
      var searchbarCompObj = {
                         name: "searchbarComp",
                         tgId: tgid,
                         isBg: false,
                         bgColor: "",
                         script: searchbarScript
                       }
      
      //swiper 组件
      //脚本
      var swiperScript = `
  <script src="https://cdn.bootcss.com/Swiper/3.4.2/js/swiper.min.js"><\/script>
  <link rel="stylesheet" href="https://cdn.bootcss.com/Swiper/3.4.2/css/swiper.min.css">
 <script>
var swiper = new Swiper('.sm-swiper[data-case=${tgid}]', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
          autoplay:2000
			})
<\/script>
`
      
      var swiperCompObj = {
                         name: "swiperComp",
                         tgId: tgid,
                         isText: false,
                         textAlign: "bullet-right",
                         script: swiperScript,
                         cells: [
                           {img:"https://images.uiiiuiii.com/wp-content/uploads/2018/01/uiii-bbanner-1172.jpg",text: "幻灯片标题",id: tgid + "-1"},
                           {img:"https://images.uiiiuiii.com/wp-content/uploads/2018/02/uiii-bbaner-203.jpg",text: "幻灯片标题",id: tgid + "-2"},
                           {img:"https://images.uiiiuiii.com/wp-content/uploads/2018/01/uiii-bbanner-125.jpg",text: "幻灯片标题",id: tgid + "-3"}
                         ]
                       }
      //avatar 组件 
      var avatarCompObj = {
                         name: "avatarComp",
                         avatarAlign: "", 
                         fontColor: "", 
                         size: "", 
                         bgColor: "", 
                         bgImage: "", 
                         userName: "昵称", 
                         userInfo: "NiChen", 
                       }
      //flextext 组件
      var flextextCompObj = {
                         name: "flextextComp",
                         tgId: tgid,
                         isBg: false,
                         bgColor: "",
                         isDivider: false,
                         cells: [
                           {one: "货币基金", two: "5.53%", three: "7日年化", id: tgid + "-1"},
                           {one: "月度理财", two: "4.72%", three: "上期年化", id: tgid + "-2"},
                           {one: "五星基金", two: "52.8%", three: "近1年收益", id: tgid + "-3"}
                         ]
                       }
      //image 组件 
      var imageCompObj = {
                         name: "imageComp",
                         url: "",
                         size: 50
                       }
      
      //组件类型判断
      switch(compType) {
          case "btnComp":
            compObj = btnCompObj
            break
          case "inputComp":
            compObj = inputCompObj
            break
          case "buttonbarComp":
            compObj = buttonbarCompObj
            break
          case "listComp":
            compObj = listCompObj
            break
          case "checkboxComp":
            compObj = checkboxCompObj
            break
          case "radioComp":
            compObj = radioCompObj
            break
          case "textareaComp":
            compObj = textareaCompObj
            break
          case "switchComp":
            compObj = switchCompObj
            break
          case "selectComp":
            compObj = selectCompObj
            break
          case "htmlComp":
            compObj = htmlCompObj
            break
          case "spaceComp":
            compObj = spaceCompObj
            break
          case "panelComp":
            compObj = panelCompObj
            break
          case "articleComp":
            compObj = articleCompObj
            break
          case "gridComp":
            compObj = gridCompObj
            break
          case "navbarComp":
            compObj = navbarCompObj
            break
          case "searchbarComp":
            compObj = searchbarCompObj
            break
          case "swiperComp":
            compObj = swiperCompObj
            break
          case "avatarComp":
            compObj = avatarCompObj
            break
          case "flextextComp":
            compObj = flextextCompObj
            break
          case "alertComp":
            compObj = alertCompObj
            break
          case "imageComp":
            compObj = imageCompObj
            break
      }
      
      if(isDragin == true){
        if($clonedom.css("opacity") != "0.5"){
            this.comps.splice((this.comps.length-1), 0, compObj)
        }else{
            $clonedom.remove()
            this.comps.splice(cloneIndex, 0, compObj)
          }  
      }else{
        $clonedom.remove()
      }
      
    },
    handleDragover:function(event){ 
      //拖动经过时，添加拖动对象
      var ele = $(event.target).closest('[data-comp="drag-div"]')
      overId = ele.attr("id")
      $(dom).hide()
      if(cloneId < overId){
        ele.after($clonedom[0])
        cloneId++
      }else{
        ele.before($clonedom[0])
        cloneId--
      }
      //拖动经过时，设置拖动对象的样式
      $clonedom.css({"border":"1px dashed #5bc0de","opacity":"0.5"})
      cloneIndex =  $clonedom.index('[data-comp="drag-div"]:visible')

    },
    handleDragend:function(event){ 
      $clonedom.remove()
      $(dom).show()
      this.comps.splice(cloneIndex, 0, this.comps.splice(domId, 1)[0])
    },
    
    /*===========================
      case 操作事件
    =============================*/
    //下拉选择
    caseSelect:function(event){
      var casetype = event.target.value
      var currCaseid = this.comps[this.compIdx].caseid
      let _this = this
      var tempCaseid
      
      //当buttonComp没有关联caseComp并删除时，对应buttonComp的type为undefined
      //buttonComp删除时type没有了，关联v-modal会触发caseSelect事件
      if(_this.comps[_this.compIdx].type == undefined){
        return
      }
      if(casetype != "none" ){ 
        var caseObj
        
        
        //actionsheet脚本
        var actionsheetScript = `
                              <script>
$(":not(div)[data-case=${currCaseid}]").on("click",function(e){
  $(".sm-mask[data-case=${currCaseid}]").fadeIn(200)
  $(".sm-actionSheet[data-case=${currCaseid}]").addClass('toggle')	
})
$(".sm-mask, .action-cancel").on("click",function(e){
  e.stopPropagation()
  $(".sm-mask").fadeOut(300)
  $(".sm-actionSheet").removeClass('toggle')			
})
<\/script>
`       
        //toast脚本
        var toastScript = `
                          <script>
$(":not(div)[data-case=${currCaseid}]").on("click",function(){		
   var  $toast = $(".sm-toast[data-case=${currCaseid}]")
   if ($toast.css('display') != 'none') return;		
   $toast.fadeIn(100)
   setTimeout(function(){
     $toast.fadeOut(100)
   },2000)
})
<\/script>
`
        //根据选择的case类型，添加对应的脚本; to do: 在这里为每个事件类型添加不同的数据，变量为{...}，用splice添加
        switch(casetype) {
          case "actionsheet":
            caseObj = {name: casetype + "Comp", caseId: currCaseid, title: "标题", menu: "示例菜单一", script: actionsheetScript, isToggle: true}
            break
          case "toast":
            caseObj = {name: casetype + "Comp", caseId: currCaseid, tips: "加载中", icon: "sm-icon-loading", script: toastScript, isToggle: true}
            break
        }
        
        //第一次添加case组件
        if(_this.caseIdx == null){
           _this.comps.splice((_this.comps.length-1), 0, caseObj) 
           _this.caseIdx = _this.comps.length-2
        }else{
          
          $.each(_this.comps, function(i, item){
            if(item.caseId == currCaseid){
               if(_this.compIdx != i){
                 _this.caseIdx = i
                 tempCaseid = _this.comps[i].caseId
                 _this.comps.splice(i, 1)
                 _this.comps.splice(i, 0, caseObj) 
               }
            }
          })
          
          //添加第二个case组件时，判断选中的buttonComp没有对应case组件，则新增一个case组件
          if(tempCaseid != currCaseid){
            _this.comps.splice((_this.comps.length-1), 0, caseObj) 
            _this.caseIdx = _this.comps.length-2
          }
        }
        
      }else{
        this.caseDel(currCaseid)
      }
    },
    //删除事件函数-判断选中id与关联事件组件id是否一致
    caseDel:function(caseid){
      let _this = this
      $.each(_this.comps, function(i, item){
           if(item.caseId == caseid){
             if(_this.compIdx != i){
               _this.comps.splice(i, 1)
               return false
             }
           }
      })
    },
    //选择buttonComp时就关联了对应的caseComp的id
    caseidSet:function(caseid){
      let _this = this
      $.each(_this.comps, function(i, item){
           if(item.caseId == caseid){
             if(_this.compIdx != i){
               _this.caseIdx = i
               return false
             }
           }
      })
    },
    /*===========================
      cells 新增删除
    =============================*/
    //cell新增
    addCell(cell) {
      var inputLength = this.comps[this.compIdx].cells.length
      this.comps[this.compIdx].cells.splice(inputLength, 0, cell)
    },
    //cell删除
    delCell(idx){
      this.comps[this.compIdx].cells.splice(idx, 1)
    },
    /*===========================
      cells排序 上下移动
    =============================*/
    sortCell(direction,index){
      var cells = this.comps[this.compIdx].cells
      var inputLength = this.comps[this.compIdx].cells.length
      if(direction == "up"){
        if(index == 0){
          return
        }
        cells[index] = cells.splice((index - 1), 1, cells[index])[0];
       
      }else{
        if(index == inputLength - 1){
          return
        }
        cells[index] = cells.splice((index + 1), 1, cells[index])[0];
      }
    },
    /*===========================
      下拉框获取json数据 
    =============================*/
    getJson:function(){
      let _this = this
      $.ajax({
          type: 'get',
          url: _this.jsonUrl,
          dataType: 'json',
          success: function(data){
            //_this.comps[_this.compIdx].cells = []
            //变量json返回的cell数组,要写JSON Schema
            /*to do: 
             * 1、获取json的属性都不相同，可能是字符串，或对象，或数组；所以不能用变量，
             * 2、要更新的data中的值也不一样不一定是cells，getJson()方法需要用参数传值
             * 3、json中的字段和组件中的字段不一样，比如tag表示名称，json文件对应的不一定是tag标签
             */
//            $.each(data.cells, function(i, cell){
//              _this.comps[_this.compIdx].cells.push(cell)
//            })
          }
       })
    }
  },
  updated:function() {
    /*
     * 在每个page生成的html中过滤html编辑生成冗余代码
     */
    var pageOfHtml = $("#canvas").clone()
    var pageOfCss = ""
   
    //获取css
    if(pageOfHtml.find("style")){
      pageOfHtml.find("style").each(function(){
        pageOfCss += $(this).html()
      })
      this.generateHtml[this.pageIdx].getCss = pageOfCss
    }
    
    //获取html
    if(pageOfHtml.find(".html-box")){
      pageOfHtml.find(".html-box").each(function(){
        var boxWp = $(this).find(".box-wp")
        $(this).replaceWith(boxWp.children())
      })
    }
    //删除select box
    pageOfHtml.find(".select-box").remove()
    
    this.generateHtml[this.pageIdx].getHtml = pageOfHtml.html()
  },
  created:function(){
    
    //撤消快捷键ctrl+z
    let _this = this;
    document.onkeydown = function(){
      if(event.ctrlKey == true && event.keyCode == 90){
        if($(".c-ipt").is(":focus") || $("textarea").is(":focus")){
          return
        }else{
          event.preventDefault()
          _this.undoThis()
        }
      }
    }    
  }
})