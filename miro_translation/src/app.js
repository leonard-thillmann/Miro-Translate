let fromLanguage = "eng"
let intoLanguage = "ger"

let temp;

const htmlTag = '/<\/?[^>]+(>|$)/g'

async function translation() {

  translate.engine = "google"; // Or "yandex", "libre", "deepl"
  translate.from = fromLanguage //Set a language to translate from

  //############################################# EDIT ########################################################################

  // Get all selected items
  const items = await miro.board.getSelection();

  items.forEach(async (item) => {
    switch (item.type) {
      case 'sticky_note':
        item.content = await translate(item.content.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        break;
      case 'card':
        item.title = await translate(item.title.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content  
        item.description = await translate(item.description.replace(htmlTag, ""), intoLanguage)
        break;
      case 'text':
        item.content = await translate(item.content.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        break;
      case 'app_card':
        item.title = await translate(item.title.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        item.description = await translate(item.description.replace(htmlTag, ""), intoLanguage)
        break;
      case 'shape':
        item.content = await translate(item.content.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        break;
      case 'frame':
        item.title = await translate(item.title.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        break;
      case 'image':
        item.title = await translate(item.title.replace(htmlTag, ""), intoLanguage) //Remove html Tag and translate content
        break;
    }
    item.sync();
  });
}



//########################################################## COPY PASTE ##########################################################

let elementsWithCoords = [];
let rightElementX = "";

async function translationRight() {

  translate.engine = "google"; //Or "yandex", "libre", "deepl"
  translate.from = fromLanguage //Set a language to translate from

  let board = await miro.board.getSelection();

  //Creates an array with just the elements that have a x-value
  board.forEach(element => {
    if (element.x) {
      if (element.type != "table_text") {
        elementsWithCoords.push(element)
      }
    }
  })

  //The x-value of the most right item on the board
  let rightElement = elementsWithCoords.reduce((prev, current) => prev.x > current.x ? prev : current)
  rightElementX = rightElement.x + rightElement.width

  //The x-value of the most left item on the board
  let leftElementX = elementsWithCoords.reduce((prev, current) => prev.x < current.x ? prev : current).x
  console.log(leftElementX, rightElementX)

  const items = await miro.board.getSelection();

  //Creates new, similar elements on the right side of the board
  items.forEach(async (item) => {
    switch (item.type) {

      case 'sticky_note':
        await miro.board.createStickyNote({
          ...item, //Uses the same values as the original Stickynote
          x: rightElementX + item.x - leftElementX,
          height: undefined,
          content: await translate(item.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and
        });

      case 'card': //For every selected card
        await miro.board.createCard({
          ...item,
          x: rightElementX + item.x - leftElementX,
          title: await translate(item.title.replace(htmlTag, ""), intoLanguage), //Content remove html Tag and
          description: await translate(item.description.replace(htmlTag, ""), intoLanguage)
        })
        break;

      case 'text':
        await miro.board.createText({
          ...item,
          x: rightElementX + item.x - leftElementX,
          content: await translate(item.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and
        })
        break;

      case 'app_card':
        await miro.board.createAppCard({
          ...item,
          x: rightElementX + item.x - leftElementX,
          title: await translate(item.title.replace(htmlTag, ""), intoLanguage), //Content remove html Tag and
          description: await translate(item.description.replace(htmlTag, ""), intoLanguage)
        })
        break;

      case 'shape':
        await miro.board.createShape({
          ...item,
          x: rightElementX + item.x - leftElementX,
          content: await translate(item.content.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and
        })
        break;

      case 'frame':
        await miro.board.createFrame({
          ...item,
          x: rightElementX + item.x - leftElementX,
          title: await translate(item.title.replace(htmlTag, ""), intoLanguage), //Content remove html Tag and
        })
        break;

      case 'image':
        await miro.board.createImage({
          ...item,
          x: rightElementX + item.x - leftElementX,
          title: await translate(item.title.replace(htmlTag, ""), intoLanguage) //Content remove html Tag and
        })
        break;
    }
    item.sync();
  });
}



//########################################### CHANGE LANGUAGES ######################################################

async function changeFromLanguage(event) {
  console.log(event.target.id)
  fromLanguage = event.target.id
  document.getElementById("fromLanguage").innerHTML = event.target.innerHTML
}

function changeIntoLanguage(event) {
  console.log(event.target.id)
  intoLanguage = event.target.id
  document.getElementById("intoLanguage").innerHTML = event.target.innerHTML
}

function swapLanguages() {
  document.getElementById("fromLanguage").innerHTML = document.getElementById(intoLanguage).innerHTML
  document.getElementById("intoLanguage").innerHTML = document.getElementById(fromLanguage).innerHTML
  //Swap languages
  temp = fromLanguage;
  fromLanguage = intoLanguage;
  intoLanguage = temp;
}



//########################################## INTERACTIONS ##############################################################

function replaceAlert() {
  let confirmAction = confirm("Are you sure that you want to irreversibly replace the content of these elements?");
  if (confirmAction) {
    translation()
  }
}