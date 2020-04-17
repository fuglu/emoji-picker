import { app, BrowserWindow, globalShortcut, Menu, Tray } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";

let win: BrowserWindow;
let tray;
let isQuiting = false;

const togglewin = () => {
  win.isVisible() ? win.hide() : win.show();
};

function createWindow() {
  if (app.dock) app.dock.hide();

  console.log(__dirname);
  tray = new Tray(join(__dirname, "../../public/logo512.png"));
  tray.on("click", togglewin);

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: function () {
        win.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        // isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${join(__dirname, "../build/index.html")}`
  );

  win.on("blur", (event: any) => {
    event.preventDefault();
    win.hide();

    return false;
  });

  win.on("minimize", function (event: any) {
    event.preventDefault();
    win.hide();
  });

  win.on("close", function (event) {
    if (!isQuiting) {
      event.preventDefault();
      win.hide();
      return false;
    }
  });
}

// app.on("activate", () => {
//   if (win === null) {
//     createWindow();
//   }
// });

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("CommandOrControl+Alt+Space", () => {
    togglewin();
  });
});
