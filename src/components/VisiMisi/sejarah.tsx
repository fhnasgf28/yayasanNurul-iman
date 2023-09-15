import { PageLayout, Text, List,LinkTo } from "../../components";
import { ListType } from "../../shared/enums";
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import firebaseApp from "../../utils/firebase"
import { getDatabase, ref, child, get,} from 'firebase/database';


const Sejarah: React.FC = () => {

  const [dataList, setDataList] = useState<{sejarah: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'sejarah'));
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
    <div className="bg-white p-6 shadow">
        <Text subtitle className='text-3xl font-medium'>
            Sejarah Yayasan
        </Text>
        
        {dataList.map((item, index) => (
            <Text key={index}>{item.sejarah}</Text>
            ))}
    </div>
            
    )
};

export default Sejarah;