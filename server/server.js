const express=require ('express') ;
const cors=require ('cors');
const mongoose=require('mongoose');
const authRoutes=require('./router/auth');
require('dotenv').config();
const app=express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use('/api',authRoutes);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("MongoDB connected");
     app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err=>console.error(err));