translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.from = "ger" //Set a language to translate from
let language = "eng"; //Set a language to translate into



// Get all items from the board
const items = await miro.board.get();

let stickyContentArray = [];
let stickyContentTrimmed = "";



async function getStickyNotes() {

  let i = 0;

  items.forEach(async (items) => {
    switch (items.type) {
      case 'sticky_note':
        if (items.content) {
          stickyContentTrimmed = items.content.replace(/<\/?[^>]+(>|$)/g, "");
          stickyContentArray.push({ content: stickyContentTrimmed, id: items.id, index: i})
          i++;
        }
    }
  });
  stickyContentArray.forEach(async element => createStickynote(element))
}

async function createStickynote(element) {
  const stickyNote = await miro.board.createStickyNote({
    content: await translate(element.content, language),
    style: {
      fillColor: 'red'
    },
    width: 1000,
    x: element.index*1000 //Setting the stickyNote off by its index*1000
  });
}



await getStickyNotes();