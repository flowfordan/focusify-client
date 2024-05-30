'use client';
// import { PageHome } from 'pages_units';
// import { LayoutMain } from 'shared';
// import { Header } from 'widgets/Header';
// import { ModulesToggleWidget } from 'widgets/ModulesToggle';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const PageHome = dynamic(() =>
  import('pages_units').then((mod) => mod.PageHome)
);

const ModulesToggleWidget = dynamic(() =>
  import('widgets/ModulesToggle').then((mod) => mod.ModulesToggleWidget)
);

const Header = dynamic(() =>
  import('widgets/Header').then((mod) => mod.Header)
);

const LayoutMain = dynamic(() =>
  import('shared').then((mod) => mod.LayoutMain)
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  //layout
  //page component

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LayoutMain header={<Header />}>
      <PageHome />
      <ModulesToggleWidget />
    </LayoutMain>
  );
}
