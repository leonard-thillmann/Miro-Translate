translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.from = "ger" //Set a language to translate from
let language = "eng"; //Set a language to translate into

const htmlTag = '/<\/?[^>]+(>|$)/g'

// Get all items from the board


async function translation() {

  const items = await miro.board.getSelection();

  items.forEach(async (items) => {
    switch (items.type) {
      case 'sticky_note': //For every selected Stickynote
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), language) //Content remove html Tag and 
        }
      case 'card': //For every selected card
        //TODO runtime optimisation  IF statement
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), language) //Content remove html Tag and    
          items.description = await translate(items.description.replace(htmlTag, ""), language)
        }
      case 'text':
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), language) //Content remove html Tag and    
        }
      case 'app_card':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), language) //Content remove html Tag and 
          items.description = await translate(items.description.replace(htmlTag, ""), language)
        }
      case 'shape':
        if (items.content) {
          items.content = await translate(items.content.replace(htmlTag, ""), language) //Content remove html Tag and    
        }
      case 'frame':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), language) //Content remove html Tag and 
        }
      case 'image':
        if (items.title) {
          items.title = await translate(items.title.replace(htmlTag, ""), language) //Content remove html Tag and 
        }
    }
    items.sync();
  });
}

function testFunction() {
  console.log("TEST")
}

//await translation();