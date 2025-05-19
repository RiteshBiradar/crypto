import CryptoStat from "../models/crypto.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios"
import { ApiError } from "../utils/ApiError.js";

export const storeCryptoStats = asyncHandler(async()=>{
    const url = process.env.COINGECKO_URI;
    const {data} = await axios.get(url,{
        params:{
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true            
        }
    })

    for (const coin of ['bitcoin', 'ethereum', 'matic-network']) {
      await CryptoStat.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change
      });
    }
})


export const stats = asyncHandler(async(req,res)=>{
    const {coin} = req.query;
    const data = await CryptoStat.findOne({ coin }).sort({ createdAt: -1 });

    if(!data) throw new ApiError(404,"Coin Not Found")
    res.status(200).json({
        succces : true,
        message : "Coin data fetched succesfully",       
        price : data.price,
        marketCap: data.marketCap,
        "24hChange": data.change24h
    })
})

export const deviation = asyncHandler(async(req,res)=>{
    const { coin } = req.query;
    
    const records = await CryptoStat.find({ coin }).sort({ createdAt : -1 }).limit(100);
    if (!records.length) throw new ApiError(404,"Data Not Found For Deviation")
    
    const prices = records.map(r => r.price);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((sum, p) => sum + (p - mean) ** 2, 0) / prices.length;
    const deviation = Math.sqrt(variance);
    
    res.json({
        succces : true,
        message : `Deviation fetched succesfully for ${coin}`, 
        deviation: Number(deviation.toFixed(2))
     });
})

