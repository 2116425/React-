const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://grofers:grofers@cluster0.cut2rgs.mongodb.net/grofersmern?retryWrites=true&w=majority'
//const mongoURI = 'mongodb://grofers:grofers@ac-jk51jey-shard-00-00.cut2rgs.mongodb.net:27017,ac-jk51jey-shard-00-01.cut2rgs.mongodb.net:27017,ac-jk51jey-shard-00-02.cut2rgs.mongodb.net:27017/grofersmern?ssl=true&replicaSet=atlas-mqipea-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB =async() =>{
   await mongoose.connect(mongoURI,{ useNewUrlParser: true },async(err,result)=>{
    if(err) console.log("---",err);
    else{
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err, data){
           const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err,catData){
                if(err) console.log(err);
                else{
                     global.food_items = data;
                     global.foodCategory = catData;
                }
            })
           // if(err) console.log(err);
            //else{
              //  global.food_items = data;
                
            //}
        })
    }
    });

}
module.exports = mongoDB;
