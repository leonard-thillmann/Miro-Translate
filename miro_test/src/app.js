translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.from = "ger" //Set a language to translate from
let language = "eng"; //Set a language to translate into


// Get all items from the board
const items = await miro.board.getSelection();

async function translation() {
  items.forEach(async (items) => {
    switch (items.type) {
      case 'sticky_note': //For every selected Stickynote
        if (items.content) {
          items.content = await translate(items.content.replace(/<\/?[^>]+(>|$)/g, ""), language) //Content remove html Tag and 
        } 
      case 'card': //For every selected card
        if(items.title) {
          items.title = await translate(items.title.replace(/<\/?[^>]+(>|$)/g, ""), language) //Content remove html Tag and    
          items.description = await translate(items.description.replace(/<\/?[^>]+(>|$)/g, ""), language)
        }
    }
    items.sync();
  });
}

await translation();

