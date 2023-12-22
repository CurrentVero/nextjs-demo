import Head from 'next/head'
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(MeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(MeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log(result);
  }

  router.push("/");

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add new data meetup!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
