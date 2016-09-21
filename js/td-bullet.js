

_TD.loading.push(function(TD){


  TD.bullet = function( cfg ){
    this.position = cfg.position;
    this.origin = cfg.start;
    this.target = cfg.end;
    this.type = cfg.type;
    this.damage = cfg.damage;
    this.speed = TD.cfg.Arsenal[this.type].speed;  //bullet speed
    this.range = TD.cfg.Arsenal[this.type].damageRange;
    this.exploding = TD.cfg.Arsenal[this.type].exploding;  // exploding style
    this.index = 0;  //exploding frame index

    this.move = function(){
      if(pointEq(this.target, this.position)==true){
        if(this.index < this.exploding.length){
          var obj = {
            position : nextPosition,
            type : this.type,
            exploding : this.exploding[this.index]
          };
          this.index++;
          TD.eventQueue.push(obj);
          return true;
        }else{
          return false;
        }
      }
      var nextPosition = TD.lang.getNextPos(this.position, this.origin, this.target, this.speed);
      var obj = {
        position : nextPosition,
        type : this.type
      };
      if(pointEq(this.target, this.position)==true){
        this.makeDamage();
        obj['exploding'] = this.exploding[this.index];
        this.index++;
      }
      TD.eventQueue.push(obj);
      return true;
    };

    this.makeDamage = function(){
      var idx, ms;
      for(idx=0; idx<TD.monsterQueue.length; idx++){
        ms = TD.monsterQueue[idx];
        if(TD.lang.getDistance(this.target, ms.position) <= this.range){
          this.live -= this.damage;
        }
      }
    };

  }

});