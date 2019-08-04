const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

let win;
var formData;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
 // Menu.setApplicationMenu(mainMenu)
  // and load the index.html of the app.
  win.loadFile('index.html')
}

//Catch Data
ipcMain.on('data:add', function(event, data){
  const fs = require('fs');
  let formData = JSON.stringify(data);
  fs.writeFileSync('data.json', formData)
  win.loadFile('scoreBoard.html') 
});

const mainMenuTemplate = [{
  label:'file'
}];

app.on('ready', createWindow)

//if on mac
if(process.platform =='darwin'){mainMenuTemplate.unshift({});}

function populate()
{
  console.log(formData)
  document.getElementById("body").innerHTML = formData;
}