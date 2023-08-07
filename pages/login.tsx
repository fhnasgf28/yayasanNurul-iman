import Head from "next/head";
import LoginPage  from "../src/components/LoginPage/LoginPage";
import PageLayout from "../src/layouts/PageLayouts";

export default function Home() {
  return (
    <PageLayout>
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-200">
      <Head>
        <title>Slider Login / Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage />
      </div>
    </PageLayout>
    
  );
}
