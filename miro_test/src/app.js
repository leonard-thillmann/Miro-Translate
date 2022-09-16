translate.engine = "google"; // Or "yandex", "libre", "deepl"
let language = "it"; //Set a language to translate into

/* const text = await translate("hallo", "it")
console.log(text) */


// Get all items from the board
const items = await miro.board.get();

let stickyContentArray = [];
let stickyContentTrimmed = "";

async function getStickyNotes() {

  items.forEach((items) => {
    switch (items.type) {
      case 'sticky_note':
        if (items.content) {
          stickyContentTrimmed = items.content.replace(/<\/?[^>]+(>|$)/g, "");
          stickyContentArray.push({ content: stickyContentTrimmed, id: items.id })
        }
    }
  });


}

async function translateContent(content) {
  let translation = await translate(content, language)
  return translation;
};

getStickyNotes();


console.log(stickyContentArray)





          //items.sync()