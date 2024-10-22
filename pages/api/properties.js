import {connectToDatabase} from "../../util/mongodb";



export default async function handler(req,res){
    const {db} = await connectToDatabase();
    const data = await db.collection("listingsAndReviews").find({}).limit(50).toArray();
    res.json(data);
}