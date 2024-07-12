const mongoose = require("mongoose")

async function getConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/mern_9am_may24")
        console.log("Database is Connected")
    } catch (error) {
        console.log(error)
    }
}
getConnect()


// mongoose.connect("mongodb://localhost:27017/we_9am_may24")
// .then(()=>{
//     console.log("Database is Connected")
// })
// .catch(error=>{
//     console.log(error)
// })