import type { NextPage } from "next";
import { useState } from "react";
import Link from 'next/link';
import ReactModal from 'react-modal';

// Ensure that the modal root element is set
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');
}

export type FooterType = {
  className?: string;
};

const SubscribeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, // Ensure the modal is on top
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 1001, // Ensure the modal content is on top of the overlay
        },
      }}
    >
      <button 
        onClick={onClose} 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      <div>
        <h2>Subscribe to our Newsletter</h2>
        <iframe
          src="https://embeds.beehiiv.com/20b8be88-a6b8-475b-98ea-4e2f6b1e4ddb?slim=true"
          data-test-id="beehiiv-embed"
          height="52"
          frameBorder="0"
          scrolling="no"
          style={{ margin: 0, borderRadius: '0px', backgroundColor: 'transparent' }}
        ></iframe>
      </div>
    </ReactModal>
  );
};

const Footer: NextPage<FooterType> = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className={`self-stretch flex flex-row items-start justify-start max-w-full z-[1] text-center text-[1.044rem] text-aipgf-white font-aipgf-manrope-semibold-1356 ${className}`}>
      <div className="flex-1 bg-aipgf-shark1 flex flex-row items-center justify-between sm:flex-col sm:justify-center py-[1.937rem] px-[2rem] box-border [row-gap:20px] max-w-full lg:flex-wrap mq825:pl-[1.5rem] mq825:pr-[1.5rem] mq825:box-border">
        <div className="flex-[0.3512] w-full flex flex-row items-center sm:w-full justify-center py-[1rem] px-[0.5rem] box-border min-w-[18.813rem] max-w-full gap-[1.25rem] lg:flex-1 sm:justify-center mq825:justify-center">
          <Link href="https://twitter.com/ai_pgf" target="_blank" rel="noopener noreferrer">
            <img className="h-[1rem] w-[1rem] relative min-h-[1rem] cursor-pointer" alt="Twitter" src="/vector-45.svg" />
          </Link>
          <Link href="https://youtube.com/@potlock" target="_blank" rel="noopener noreferrer">
            <img className="h-[0.938rem] cursor-pointer relative" alt="Social Media" src="/vector-46.svg" />
          </Link>
          <Link href="https://t.me/+ziyPvIoYO5EwOTkx" target="_blank" rel="noopener noreferrer">
            <img className="h-[1rem] relative min-h-[1rem] cursor-pointer" alt="Telegram" src="/vector-47.svg" />
          </Link>
        </div>
        <Link href="https://bento.me/potlock" target="_blank" rel="noopener noreferrer" className="flex flex-1 sm:flex-row items-center justify-center py-[0.718rem] px-[0rem] box-border gap-[0.4rem] max-w-full cursor-pointer sm:flex-wrap">
          <div className="relative leading-[1.563rem] font-extrabold inline-block min-w-[5.625rem] text-aipgf-white no-underline">
            Part of the 
          </div>
          <img className="h-[1.106rem] w-[5.769rem] relative" alt="Potlock" src="/-potlock-1.svg" />
          <div className="relative leading-[1.562rem] font-extrabold text-aipgf-white no-underline">
            open funding stack
          </div>
        </Link>
        <div className="flex flex-row items-center justify-center py-[0.5rem] px-[0.5rem] box-border gap-[0.5rem] min-w-[18.813rem] max-w-full text-left text-[0.963rem] lg:flex-1 sm:box-border mq825:flex-wrap">
          <div className="relative leading-[2rem] text-center sm:text-left">
            Subscribe to our newsletter
          </div>
          <button className="cursor-pointer border-aipgf-white border-[1px] border-solid py-[0.062rem] px-[0.437rem] bg-[transparent] w-[5.625rem] rounded-3xl box-border flex flex-row items-center justify-center" onClick={openModal}>
            <div className="h-[1.5rem] flex flex-row items-center justify-start py-[0rem] px-[0.25rem] box-border">
              <div className="relative text-[0.85rem] leading-[2.5rem] font-semibold font-aipgf-manrope-semibold-1356 text-aipgf-white text-center inline-block min-w-[4.125rem]">
                Subscribe
              </div>
            </div>
          </button>
        </div>
      </div>
      <SubscribeModal isOpen={isModalOpen} onClose={closeModal} />
    </footer>
  );
};

export default Footer;