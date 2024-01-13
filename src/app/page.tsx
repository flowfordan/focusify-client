'use client';
import { PageHome } from 'pages_units';
import { LayoutMain } from 'shared';
import { Header } from 'widgets/Header';
import { ModulesToggleWidget } from 'widgets/ModulesToggle';

export default function Home() {
  //layout
  //page component
  return (
    <LayoutMain header={<Header />}>
      <PageHome />
      <ModulesToggleWidget />
    </LayoutMain>
  );
}
