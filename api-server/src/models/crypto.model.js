import mongoose, { Schema } from "mongoose";

const cryptoSchema = new Schema({
    coin : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    marketCap : {
        type : Number,
        require : true
    },
    change24h : {
        type : Number,
        require : true
    },  
},{
    timestamps : true
})

const CryptoStat = mongoose.model("CryptoStat",cryptoSchema)

export default CryptoStat