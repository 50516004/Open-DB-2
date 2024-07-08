import { lusitana } from '@/src/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[34px]">OpenDB</p>
    </div>
  );
}
