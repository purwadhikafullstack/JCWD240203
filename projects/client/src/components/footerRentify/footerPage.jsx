'use client';

import { Footer } from 'flowbite-react';

export default function DefaultFooter() {
  return (
    <Footer container>
      <Footer.Copyright
        by="Rentify,Inc."
        href="#"
        year={2023}
      />
      <Footer.LinkGroup className='justify-between'>
        <Footer.Link href="#">
          Terms
        </Footer.Link>
        <Footer.Link href="#">
          Sitemap
        </Footer.Link>
        <Footer.Link href="#">
          Privacy
        </Footer.Link>
        <Footer.Link href="#">
          Your Privacy Choices
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}


