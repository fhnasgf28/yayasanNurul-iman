import { PageLayout, Text, List,LinkTo } from "../../components";
import React, { useEffect, useState } from 'react';
import firebaseApp from "../../utils/firebase"
import { getDatabase, ref, child, get,} from 'firebase/database';


const Visi: React.FC = () => {

  const [dataList, setDataList] = useState<{visi: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'visi'));
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
    <div>
        <Text>
            Visi
        </Text>
        <Text>
        {dataList.map((item, index) => (
        <div key={index}>{item.visi}</div>
        ))}
        </Text>
    </div>
    )
};

export default Visi