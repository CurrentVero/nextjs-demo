// import { useEffect, useState } from 'react'
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  {
    id: "m1",
    title: "Sample Title",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Mandarin.duck.arp.jpg",
    address: "Sample Address",
    description: "Sample Description",
  },
  {
    id: "m2",
    title: "Sample Title",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Mandarin.duck.arp.jpg",
    address: "Sample Address",
    description: "Sample Description",
  },
  {
    id: "m3",
    title: "Sample Title",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Mandarin.duck.arp.jpg",
    address: "Sample Address",
    description: "Sample Description",
  },
];

export default function HomePage() {
  // const [loadedMeetup, setLoadedMeetup] = useState([])

  // useEffect(() => {
  //     setLoadedMeetup(DUMMY_DATA);
  // }, [])

  // return <MeetupList meetups={DUMMY_DATA}/>

  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="This is website for meetup!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// pre rendering client side function
// (fungsi yang hanya berjalan saat project di build)

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://testing:t4s0GndSTn67pIjE@cluster0.rmrhmyh.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 10,
  };
}

// pre rendering server side function
// (fungsi yang hanya berjalan saat project di build)

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_DATA,
    },
    revalidate: 10,
  };
}
