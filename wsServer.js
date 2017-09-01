const app = require('http').createServer()
const io = require('socket.io')(app)

let clientId = 0
let port = 4500

app.listen(port)

//每当新用户链接，就创建进行初始化及回调绑定
io.on('connection', function (socket) {
    //为每个用户分配ID
    clientId++
    socket.nickname = "user ID" + clientId
    //向所有目标发送连接消息
    io.emit('enter', socket.nickname + " is enter")
    
    socket.on("message", (str) => {
        io.emit("message",socket.nickname +" say:" + str)
    })
    socket.on('disconnect', (str) => {
        io.emit("leave",socket.nickname + "is leave")
    })
})

console.log("ws server listing on port " + port + "....");