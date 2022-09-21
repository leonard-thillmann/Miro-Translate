let fromLanguage = "eng"
let intoLanguage = "ger"

const htmlTag = '/<\/?[^>]+(>|$)/g'



async function translation() {

  translate.engine = "google"; // Or "yandex", "libre", "deepl"
  translate.from = fromLanguage //Set a language to translate from

  // Get all items from the board
  const items = await miro.board.getSelection();

  items.forEach(async (items) => {
    switch (items.type) {
      case 'sticky_note': //For every selected Stickynote
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and 
        }
      case 'card': //For every selected card
        //TODO runtime optimisation  IF statement
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and    
          items.description = await translate(items.description.replace(htmlTag, ""), intoLanguage)
        }
      case 'text':
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and    
        }
      case 'app_card':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and 
          items.description = await translate(items.description.replace(htmlTag, ""), intoLanguage)
        }
      case 'shape':
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and    
        }
      case 'frame':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and 
        }
      case 'image':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and 
        }
    }
    items.sync();
  });
  //console.log("TRIED TO TRANSLATE")
}



async function changeFromLanguage() {
  if (fromLanguage === "eng") {
    fromLanguage = "ger"
    document.getElementById("fromLanguage").innerHTML = "German"
    //console.log("FROMLANGUAGE: ", fromLanguage)
  } else {
    fromLanguage = "eng"
    document.getElementById("fromLanguage").innerHTML = "English"
    //console.log("FROMLANGUAGE: ", fromLanguage)
  }
}

function changeIntoLanguage() {
  if (intoLanguage === "eng") {
    intoLanguage = "ger"
    document.getElementById("intoLanguage").innerHTML = "German"
    //console.log("INTOLANGUAGE: ", intoLanguage)
  } else {
    intoLanguage = "eng"
    document.getElementById("intoLanguage").innerHTML = "English"
    //console.log("INTOLANGUAGE: ", intoLanguage)
  }
}



/* function langCheck() {
  console.log("intoLanguage: ", intoLanguage, "fromLanguage: ", fromLanguage)
} */

//console.log("intoLanguage: ", intoLanguage, "fromLanguage: ", fromLanguage)