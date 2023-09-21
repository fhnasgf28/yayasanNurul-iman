import Head from 'next/head';

const RealtimeChat = () => {
  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="2eaed6fe-d142-4d74-a7be-e5ff626c2624";
              (function(){
                var d=document;
                var s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </Head>
      {/* ...konten halaman Anda */}
    </div>
  );
};

export default RealtimeChat;
