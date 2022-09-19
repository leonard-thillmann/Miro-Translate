translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.from = "ger" //Set a language to translate from
let language = "eng"; //Set a language to translate into



// Get all items from the board
const items = await miro.board.getSelection();

let stickyContentTrimmed = "";
let stickyContentArray = [];
let cardContentTrimmed = "";
let cardContentArray = [];



async function getStickyNotes() {

  let i = 0;
  let j = 0;

  items.forEach(async (items) => {
    switch (items.type) {
      case 'sticky_note': //For every selected Stickynote
        if (items.content) {
          stickyContentTrimmed = items.content.replace(/<\/?[^>]+(>|$)/g, "");
          stickyContentArray.push({ content: stickyContentTrimmed, id: items.id, index: i })
          i++;
        }
      case 'card': //For every selected card
        if(items.title) {
          cardContentTrimmed = items.title.replace(/<\/?[^>]+(>|$)/g, "");
          cardContentArray.push({ title: cardContentTrimmed, index: j })
        }
    }
  });
  stickyContentArray.forEach(async element => createStickynote(element))
  cardContentArray.forEach(async element => createCard(element))  
}

/* ################ STICKYNOTES ################################################################################ */

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

/* ############## CARDS ######################################################################################### */

async function createCard(element) {
  const card = await miro.board.createCard({
    title: await translate(element.title, language),
    width: 1000,
    height: 1000,
    x: element.index*1000 //Setting the stickyNote off by its index*1000
  });
}



await getStickyNotes();