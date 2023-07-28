import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 240,
    height: 240,
    minWidth: 160,
    minHeight: 160,
    maxWidth: 500,
    maxHeight: 500,
    frame: false,
    show: false,
    alwaysOnTop: true,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {icon} : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.setAspectRatio(1)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//
// /**
//  * 窗口移动
//  * @param win
//  */
// function windowMove(win): void {
//   let winStartPosition = {x: 0, y: 0}
//   let mouseStartPosition = {x: 0, y: 0}
//   let movingInterval = null;
//
//   /*
//   窗口移动事件
//    */
//   ipcMain.on('window-move-open', (e, canMoving) => {
//     if (canMoving) {
//       // 读取原位置
//       const winPosition = win.getPosition()
//       winStartPosition = {x: winPosition[0], y: winPosition[1]}
//       mouseStartPosition = screen.getCursorScreenPoint()
//       // 清除
//       if (movingInterval) {
//         clearInterval(movingInterval)
//       }
//       // 新开
//       movingInterval = setInterval(() => {
//         // 实时更新位置
//         const cursorPosition = screen.getCursorScreenPoint()
//         const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
//         const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
//         win.setPosition(x, t, true)
//       }, 20)
//     } else {
//       clearInterval(movingInterval)
//       movingInterval = null
//     }
//   })
// }
//
// module.exports = {
//   windowMove
// }
