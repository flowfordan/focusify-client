'use client';
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
