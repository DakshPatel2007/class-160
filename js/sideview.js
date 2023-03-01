AFRAME.registerComponent("place-side-view",{
    tick:function(){
        const placesContainer = document.querySelector("#places-container");
        const {state} = placesContainer.getAttribute("tour");
        if(state === "view"){
            this.el.setAttribute("visible",true);
        }else{
            this.el.setAttribute("visible",false);
        };
    },
    init:function(){
        this.createPlace()
    },
    createPlaceThumbnail:function(position,id){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("id",`place-${id}`);
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:2.5
        })
        entityEl.setAttribute("material",{
            src:"assets/helicopter.png",
            opacity:0.8
        })
        entityEl.setAttribute("position",position);
        entityEl.setAttribute("cursor-listener",{});
        return entityEl
    },
    createPlace:function(){
        const sideViewContainer = document.querySelector("#side-view-container");
        let prevoiusXPosition = -150;
        let prevoiusYPosition = 30;
        for(var i = 1;i<=4;i++){
            const position = {x:(prevoiusXPosition += 50),
                              y:(prevoiusYPosition += 2),
                              z:-40};
            const entityEl = this.createPlaceThumbnail(position,i);
            sideViewContainer.appendChild(entityEl);
        }
    }

})