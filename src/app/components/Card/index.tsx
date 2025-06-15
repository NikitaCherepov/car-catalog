'use client'

import styles from './Card.module.scss'
import Image from 'next/image';
import getFormatedNumber from '@/app/utils/getFormatedNumber';
import {motion} from 'framer-motion'


interface CardProps {
  name: string;
  image: string;
  price: number | string;
  modification?: string;
  run: number;
  year: number;
}


export default function Card({name, image, price, modification, run, year}:CardProps) {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity: 0}}
        
        className={styles.container}>
            <Image 
            className={styles.container__image} 
            width={100} 
            height={100} 
            src={image} 
            quality={100}
            alt='Image car'/>
            <div className={styles.container__info}>
                <p className={styles.container__info__header}>
                    <strong>
                        {name}
                    </strong>
                </p>
                <p>
                    <strong>
                        {getFormatedNumber(price)} Р
                    </strong>
                </p>
                <p>
                    {modification}
                </p>
                <p>
                    {run} км
                </p>
                <p>
                    {year} год
                </p>

                <div className={styles.container__info__buttons}>
                    <button>
                        Купить
                    </button>
                </div>
            </div>
        </motion.div>
    )
}