import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Gpa_Calculation from './gpa_calculation'

export default function Home() {
  return (
    <div>
      <Gpa_Calculation />
    </div>
  )
}
