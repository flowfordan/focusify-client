import Image from 'next/image';
import styles from './page.module.scss';
import { PageHome } from 'pages_units';
import { LayoutMain } from 'shared';

export default function Home() {
  //layout
  //page component
  return (
    <LayoutMain>
      <PageHome />
    </LayoutMain>
  );
}
