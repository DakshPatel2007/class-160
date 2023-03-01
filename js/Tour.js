AFRAME.registerComponent("tour", {
  schema:{
    state:{type:"string",default:"places-list"},
    selectedCard:{type:"string",default:"#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },
  tick:function(){
    const {state} = this.el.getAttribute("tour");
    if(state === "view" || state == "change-view"){
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl:function(eList){
    eList.map(el => {
      el.setAttribute("visible",false)

    })
  },
  showView:function(){
    const {selectedCard} = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material",{
      src:`./assets/360_images/${selectedCard}/place-0.jpg`,
      color:"white",

    })
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position,item.id)
      // Thumbnail Element
      const thumbnailEl = this.createThumbnail(item)
      // Title Text Element
      const titleTextEl = this.createTitleText(position,item)

      borderEl.appendChild(thumbnailEl);
      borderEl.appendChild(titleTextEl);
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder:function(position,id){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id",id);
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
      primitive:"ring",
      radiusInner: 9,    
      radiusOuter: 10,
    });
    entityEl.setAttribute("position",position)
    entityEl.setAttribute("material",{
      color:"darkblue",
      opacity:0.5
    });
    entityEl.setAttribute("cursor-listener",{})
    return entityEl
  },
  createThumbnail:function(item){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
      primitive:"circle",
      radius:9
    });
    entityEl.setAttribute("material",{
      src:item.url
    })
    return entityEl
  },
  createTitleText:function(position,item){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("text",{
      font:"exo2bold",
      align:"center",
      color:"orange",
      width:80,
      value:item.title
    });
    const positionL = position
    positionL.y = positionL.y - 30;
    entityEl.setAttribute("position",positionL)
    return entityEl
  }
  
});