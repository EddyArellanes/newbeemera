import app from "./app"

//Server is Listening
app.listen(app.get('port') ,()=> {
    console.log(`
    ----------------------------------
    Beemera Server Initializing on port ${process.env.PORT || '4001'}...
    ----------------------------------
    `)
})