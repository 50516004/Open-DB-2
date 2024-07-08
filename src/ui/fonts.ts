import {
  Dela_Gothic_One,
  Inter,
  Lusitana,
  Noto_Sans_Javanese,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const noto = Noto_Sans_Javanese({ subsets: ['latin'] });

export const dela = Dela_Gothic_One({ 
  weight: "400", 
  subsets: ['latin'], 
});