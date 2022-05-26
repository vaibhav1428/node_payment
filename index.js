const express   = require('express');
const app  = express();
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51L2wFuSIakMfogRlbY0t1gPUKf7bbZyMkEdWELrX98T6LsBPeOV2Y0R4BkEDWBo7v4sCJ98x5aQBjtqPjsCk7FB400v9cTQOMM');
require('dotenv').config();


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.status(500).json({message:"internal Srver Error"});
})

app.post('/paymentstipe',async(req,res)=>{
    try {
        const paymentinstance = await stripe.paymentIntents.create({
            amount:1*100,
            currency:'INR',
            payment_method_types : ["card"]
        })       

        const clientSeceret = paymentinstance.client_secret;
        console.log(clientSeceret);
        res.json({message:"payment initiated",clientSeceret})        
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"internal Srver Error"});
    }


})



const PORT =  process.env.PORT ||8000
app.listen(PORT,()=>{
    console.log('server is running on ' +  PORT)
})