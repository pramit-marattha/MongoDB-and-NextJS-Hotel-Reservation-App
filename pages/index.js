import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ properties }) {

  return (
    <div>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("listingsAndReviews").find({}).limit(50).toArray();

  const properties = JSON.parse(JSON.stringify(data));

  // console.log(properties);
  return {
    props: { properties: properties },
  }
}
