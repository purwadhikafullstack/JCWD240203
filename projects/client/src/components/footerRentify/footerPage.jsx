import { Footer } from 'flowbite-react';

export default function DefaultFooter() {
  return (
    <Footer container className='flex flex-col md:flex-row flex-none md:items-center justify-between w-full h-[75px] p-[5px]' style={{ backgroundColor: '#f2f2f2' }}>
      <Footer.Copyright
        by=" Rentify, Inc."
        href="#"
        year={2023}
        className='text-left'
        style={{ fontSize: '1.2rem', color: 'black' }}
      />
      <Footer.LinkGroup className='gap-4 self-center'>
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
