import { Footer } from 'flowbite-react';

export default function DefaultFooter() {
  return (
    <Footer container className='w-full lg:max-w-4/5 xl:max-w-3/4 mx-auto' style={{ backgroundColor: '#f2f2f2' }}>
      <Footer.Copyright
        by=" Rentify, Inc."
        href="#"
        year={2023}
        className='text-left'
        style={{ fontSize: '1.2rem', color: 'black' }}
      />
      <Footer.LinkGroup className='gap-4'>
        <Footer.Link href="#" style={{ color: 'black' }}>
          Terms
        </Footer.Link>
        <Footer.Link href="#" style={{ color: 'black' }}>
          Sitemap
        </Footer.Link>
        <Footer.Link href="#" style={{ color: 'black' }}>
          Privacy
        </Footer.Link>
        <Footer.Link href="#" style={{ color: 'black' }}>
          Your Privacy Choices
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
