import Image from 'next/image';
import styles from './page.module.scss';
import { PageHome } from 'pages_units';
import { LayoutMain } from 'shared';
import { Header } from 'widgets/Header';

export default function Home() {
  //layout
  //page component
  return (
    <LayoutMain header={<Header />}>
      <PageHome />
    </LayoutMain>
  );
}
