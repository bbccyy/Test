
_TD.loading.push(function(TD){

  TD.waitingToBuild = null;

  //before using buildingController, new it
  TD.buildingController = function(){
    this.bld1 = document.getElementById('building-1');
    this.bld2 = document.getElementById('building-2');
    this.bld3 = document.getElementById('building-3');
    this.bld4 = document.getElementById('building-4');
    this.c = document.getElementById('td-canvas');

    this.bld1.addEventListener('click', this.onClick_building_1, false);
    this.bld2.addEventListener('click', this.onClick_building_2, false);
    this.bld3.addEventListener('click', this.onClick_building_3, false);
    this.bld4.addEventListener('click', this.onClick_building_4, false);

    this.c.addEventListener('mousemove', this.onmouseMove, false);
    this.c.addEventListener('click', this.onClick, false);

  };

  TD.buildingController.prototype = {

    onClick_building_1 : function(ev){
      if(TD.waitingToBuild == 'building-1'){
        TD.waitingToBuild = null;
        TD.cfg.clearAll(TD.ucx2, TD.uc2);
      }else{
        TD.waitingToBuild = 'building-1';
      }
    },

    onClick_building_2 : function(ev){
      if(TD.waitingToBuild == 'building-2'){
        TD.waitingToBuild = null;
        TD.cfg.clearAll(TD.ucx2, TD.uc2);
      }else{
        TD.waitingToBuild = 'building-2';
      }
    },

    onClick_building_3 : function(ev){
      if(TD.waitingToBuild == 'building-3'){
        TD.waitingToBuild = null;
        TD.cfg.clearAll(TD.ucx2, TD.uc2);
      }else{
        TD.waitingToBuild = 'building-3';
      }
    },

    onClick_building_4 : function(ev){
      if(TD.waitingToBuild == 'building-4'){
        TD.waitingToBuild = null;
        TD.cfg.clearAll(TD.ucx2, TD.uc2);
      }else{
        TD.waitingToBuild = 'building-4';
      }
    },

    onmouseMove : function (ev){
      var x = ev.clientX;
      var y = ev.clientY;
      if(TD.waitingToBuild != null){
        var obj = {
          position : [x,y],
          type : 'mouse',
          buildable : true
        };
        if(!TD.lang.ableToBuild([x,y], TD.cfg.buildingR))
          obj['buildable'] = false;
        TD.drawer(obj);
      }
    },

    onClick : function(ev){
      var x = ev.clientX;
      var y = ev.clientY;
      if(TD.waitingToBuild != null && TD.lang.ableToBuild([x,y], TD.cfg.buildingR)){
        var cfg = TD.cfg.Buildings[TD.waitingToBuild];
        if(TD.money >= cfg.price){
          TD.money -= cfg.price;
          TD.waitingToBuild = null;
          TD.cfg.clearAll(TD.ucx2, TD.uc2); // clear the view of upper layer
          var bld = new TD.building([x,y], cfg);
          cfg['cannon'] = bld.cannonDir;
          cfg['position'] = bld.position;
          TD.drawer(cfg);
          TD.buildingQueue.push(bld);
        }
      }
    },

  };

});
