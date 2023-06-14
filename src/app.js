// ----------------------------------------------------
// app.js 
// ----------------------------------------------------

// data for images 
let images = [
  {
    "number": "001",
    "url": "./src/assets/Crew-Types-Value-Stream-Crew.png",
    "name": "Value Stream Crew",
    "desc": "A Value Stream Crew has end-to-end responsibility for ...",
    "set": "Crew Types",
    "tags": [
      "crew types ",
      "value stream crew"
    ]
  },
  {
    "number": "002",
    "url": "./src/assets/Crew-Types-Governance-Crew.png",
    "name": "Governance Crew",
    "desc": "The Governance Crew is the management team...",
    "set": "Crew Types",
    "tags": [
      "crew types ",
      "governance crew"
    ]
  },
  {
    "number": "003",
    "url": "./src/assets/Crew-Types-Platform-Crew.png",
    "name": "Platform Crew",
    "desc": "The Platform Crew offers shared services ...",
    "set": "Crew Types",
    "tags": [
      "crew types ",
      "platform crew"
    ]
  },
  {
    "number": "004",
    "url": "./src/assets/Crew-Types-Facilitation-Crew.png",
    "name": "Facilitation Crew",
    "desc": "A Facilitation Crew enables other ...",
    "set": "Crew Types",
    "tags": [
      "crew types ",
      "facilitation crew"
    ]
  },

  {
    "number": "115",
    "url": "./src/assets/Base-Types-Fully-Integrated-Base.png",
    "name": "Fully Integrated Base",
    "desc": "In a Fully Integrated Base...",
    "set": "Base Types",
    "tags": [
      "base types ",
      "fully integrated base"
    ]
  },
  {
    "number": "116",
    "url": "./src/assets/Base-Types-Strongly-Aligned-Base.png",
    "name": "Strongly Aligned Base",
    "desc": "In a Strongly Aligned Base...",
    "set": "Base Types",
    "tags": [
      "base types ",
      "strongly aligned base"
    ]
  },
  {
    "number": "117",
    "url": "./src/assets/Base-Types-Loosely-Aligned-Base.png",
    "name": "Loosely Aligned Base",
    "desc": "In a Loosely Aligned Base...",
    "set": "Base Types",
    "tags": [
      "base types ",
      "loosely aligned base"
    ]
  },
  {
    "number": "118",
    "url": "./src/assets/Base-Types-Fully-Segregated-Base.png",
    "name": "Fully Segregated Base",
    "desc": "In a Fully Segregated Base...",
    "set": "Base Types",
    "tags": [
      "base types ",
      "fully segregated base"
    ]
  }
];

// get UI elements by ID
const imageContainer = document.getElementById("imageContainer");
const filterInput = document.getElementById("filterInput");
const setFilter = document.getElementById("setFilter");

// Function to render the images
function renderImages(imageList) {
      imageContainer.innerHTML = "";
      imageList.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.className = "miro-draggable image";
        imgElement.draggable=true
        imgElement.src = image.url;
        imageContainer.appendChild(imgElement);
      });
}

// Function to filter the images based on input
function filterImages() {
      const filterText = filterInput.value.toLowerCase();
      const selectedSet = setFilter.value.toLowerCase();
      let filteredImages = images;

      // Apply filter by set if a set is selected
      if (selectedSet !== "") {
        filteredImages = filteredImages.filter((image) =>
          image.set.toLowerCase().includes(selectedSet)
        );
      }

      // Apply filter by text input
      filteredImages = filteredImages.filter((image) =>
        image.name.toLowerCase().includes(filterText) ||
        image.desc.toLowerCase().includes(filterText) ||
        image.tags.some((tag) => tag.toLowerCase().includes(filterText))
      );

      renderImages(filteredImages);
}

// Event listener for input changes
filterInput.addEventListener("input", filterImages);
setFilter.addEventListener("change", filterImages);

// Initial rendering of all images
renderImages(images);

// Initial prepare set filter input
const uniqueSets = [...new Set(images.map(image => image.set))].sort();
uniqueSets.forEach((set) => {
      const option = document.createElement("option");
      option.value = set.toLowerCase();
      option.textContent = set;
      setFilter.appendChild(option);
});

init();

async function init() {
 
        await miro.board.ui.on("drop", async ({ x, y, target }) => {
            console.log ("drop ...")          
  
            if (target instanceof HTMLImageElement) {
              console.log ("drop an image ...")  
              console.log ("image = " + target.src)

              let imgUrl = target.src.replace(/http:\/\/localhost:3000\/src\/assets\//,"https://www.thiemann.com/unFIXmodel/")
              console.log ("imgUrl = " + imgUrl)     
             
              const im = await miro.board.createImage({ x:x, y:y, 
                url: imgUrl,
                width: 400,
               });
               await miro.board.viewport.zoomTo(im);
            }
        });
}
// ----------------------------------------------------
