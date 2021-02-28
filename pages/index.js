import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ properties }) {

  const handleClickBook = async (property)=>{
    let guestName = window.prompt("Enter your name: ")
    const data = await fetch(`http://localhost:3000/api/reservation?property_id=${property._id}&guest=${guestName}`)
    alert(`Thank you for your reservation ${guestName}`)
    const res = await data.json();
    console.log(res);
  }

  return (
    <>
      <Head>
        <title>Hotel Reservation app</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      <div className="container mx-auto">
        <div className="flex">
          <div className="row w-full text-center my-4">
            <h1 className="text-4xl font-bold mb-5">Hotel Reservation Web App</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {properties && properties.map(property=>(
          <div className="flex-auto w-1/4 rounded overflow-hidden shadow-lg m-2">
            <img className="w-full" src={property.image}/>
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{property.name}
            <div className="text-red-400 text-base">(Perfect fit for {property.guests} people)</div>
            </div>
            <p className="font-bold text-blue-700">{property.address.street}</p>
            <p className="text-yellow-800 text-base">{property.summary}</p>
            </div>

            <div className="text-center py-2 my-2 font-bold">
            <span className="text-pink-600">${property.price}</span> per night
          </div>

          <div className="text-center py-2 my-2">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 mr-5 rounded" onClick={()=>handleClickBook(property)}>Reserve</button>
          </div>

          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("listingsAndReviews").find({}).limit(15).toArray();

  const properties = JSON.parse(JSON.stringify(data));

  const filtered = properties.map(property=>{
  const price = JSON.parse(JSON.stringify(property.price));
// props
    return{
      _id: property._id,
      name:property.name,
      image:property.images.picture_url,
      address:property.address,
      summary:property.summary,
      guests: property.accommodates,
      price: price.$numberDecimal,
    }
  })

  return {
    props: { properties: filtered },
  }
}
