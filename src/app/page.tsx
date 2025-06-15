'use client'
import { useState, useEffect } from "react"
import styles from './page.module.scss'
import Card from "./components/Card"
import { useCars } from "./hooks/useCars"
import Pagination from "./components/Pagination/Pagination"

import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion"

interface Car {
  mark_id: string;
  folder_id: string;
  modification_id: string;
  price: number;
  year: number;
  run: number;
  images: { image: string[] };
}


export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const page = Number(searchParams.get('page'));
  const rawSort = searchParams.get('sort');
  const sort: 'asc' | 'desc' | '' = rawSort === 'asc' || rawSort === 'desc' ? rawSort : '';

  const [lastPage, setLastPage] = useState<number | null>(null);


  const {data, isLoading, isSuccess, isError} = useCars(sort, page);

  useEffect(() => {
    if (isSuccess && lastPage != data.meta.last_page) {
      setLastPage(data.meta.last_page);
    }
  }, [data])

  useEffect(() => {
    if (data && lastPage && page > lastPage) {
      updateQuery('page', String(lastPage));
    }
  }, [page])

  useEffect(() => {
    if (!page) {
      updateQuery('page', String(1))
    }
  })

  const updateQuery = (key:string, value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === '') {
      params.delete(key);
      if (key === 'sort') {
        params.set('page', '1');
      }
    } else {
      params.set(key, value);
      if (key === 'sort') {
        params.set('page', '1');
      }
    }
    router.push(`?${params.toString()}`, { scroll: false });

  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <select value={sort} onChange={e => {
          updateQuery('sort', e.target.value);}}>
          <option value=''>Не выбрана</option>
          <option value='asc'>Цена по возрастанию</option>
          <option value='desc'>Цена по убыванию</option>
        </select>
      </div>

      <motion.div 
      
      layout
      className={styles.table}>
        <AnimatePresence>
        {
          !isLoading && isSuccess ? (
            data?.data?.map((object:Car, index:number) => (
              <Card 
              key={index}
              image={object.images.image[0]} 
              name={`${object.mark_id} ${object.folder_id}`}
              price={object.price}
              modification={object.modification_id}
              year={object.year}
              run={object.run}
              />
            ))
          )
          :
          isError ?
          (
                  <motion.div 
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity: 0}}className="flex items-center justify-center absolute inset-0">
            <img className="w-[80px] h-[80px]" src={'/icons/error.png'} alt='Error!'/>
          </motion.div>
          )

          :

          <div className="flex items-center justify-center absolute inset-0">
            <img src={'/icons/waiting.svg'} alt='loading...'/>
          </div>
        }
        </AnimatePresence>
      </motion.div>


        {lastPage && (
           <Pagination page={page} setPage={(v) => {updateQuery('page', String(v))}} lastPage={lastPage || 1}/>
        )}
     
    </div>
  )

}