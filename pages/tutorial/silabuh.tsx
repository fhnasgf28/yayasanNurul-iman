/**These are necessary imports / components for the page */
// import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import React, { useEffect, useState } from "react";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { getDatabase, ref, child, get, } from "firebase/database";
import firebaseApp from "../../src/utils/firebase";



const Article = () => {
    const [dataList, setDataList] = useState<{berita: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'berita'));
      const dbvalue = dbGet.val();
      if (dbvalue) {
        setDataList(Object.values(dbvalue));
      }
      const isExist = dbGet.exists();
    } catch (getError: any) {
      console.error('Error:', getError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getValue();
  }, []);
  

    return (
        // pass blogwithsidebar as show below for article page with sidebar layout
        <PageLayout blogwithsidebar >
            <section className=" container bg-white rounded-lg shadow-lg p-8 mb-8">
                <header className="bg-blue-600 text-white py-4 px-8">
                        <h1 className="text-3xl font-bold">Masjid Nurul Iman Gelar Pengajian Ba'da Shubuh: Tafsir Surat Al-Fatihah Menyapa Pagi Umat</h1>
                </header>
                <Seperator/>
                <div className="m-4">
              {dataList.map((item, index) => (
                <div key={index} className="my-2">
                  {item.berita && item.berita.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-2">{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>

            </section>
        </PageLayout>
    )
}

export default Article;