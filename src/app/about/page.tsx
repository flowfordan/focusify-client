'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { PageAbout } from 'pages_units';
import { LayoutMain } from 'shared';
import { Header } from 'widgets/Header';

export default function About() {
  //layout
  //page component
  return (
    <LayoutMain header={<Header />}>
      <PageAbout />
    </LayoutMain>
  );
}
