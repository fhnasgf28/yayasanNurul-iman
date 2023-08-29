import { PageLayout, Text, List,LinkTo } from "../../components";
import { ListType } from "../../shared/enums";
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import firebaseApp from "../../utils/firebase"
import { getDatabase, ref, child, get, push, onValue} from 'firebase/database';


const VisiMisi: React.FC = () => {

  const [dataList, setDataList] = useState<string[]>([] as string[]);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'misi'));
      const dbvalue = dbGet.val();
      if (dbvalue) {
        const misiArray = Object.values(dbvalue);
        const misiText = misiArray.join('/n');
        setDataList(misiText.split('/n'));
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
    <div>
    <section className='container px-3 md:pb-20 md:pt-10 pt-20'>
          {/* Judul */}
          <Text title className='mt-10 dark:text-sky-400 text-sky-600' >
          Visi dan Misi Yayasan Nurul Iman
          </Text>
           {/* Visi dan Misi */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Text subtitle className='text-3xl font-medium'>
                  Visi
                </Text>
                <Text p className='text-lg'>
                  Menjadi lembaga pendidikan dan sosial yang unggul, berdaya saing, serta berlandaskan keimanan dan ketaqwaan kepada Allah SWT.
                </Text>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Text subtitle className='text-3xl font-medium'>
                  Misi
                </Text>
                <List type={ListType.disc}>
                  {dataList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </List>
              </div>
            </div>
          </div>    
        </section>
        </div>
    )
};

export default VisiMisi