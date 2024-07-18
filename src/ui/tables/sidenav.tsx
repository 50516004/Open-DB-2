import {
  Cog6ToothIcon,
  HomeIcon,
  QueueListIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import NavLinks from './nav-links';

const links = [
  {
    name: 'ホーム',
    href: '/tables/home',
    icon: <HomeIcon className='w-6'/>
  }, {
    name: 'ブックマーク',
    href: '/tables/files',
    icon: <StarIcon className='w-6'/>
  }, {
    name: '閲覧履歴',
    href: '/tables/blob',
    icon: <QueueListIcon className='w-6'/>
  }, {
    name: '設定',
    href: '/tables/setting',
    icon: <Cog6ToothIcon className='w-6'/>
  },
];

export default function SideNav() {
  return (
    <div className="h-full flex flex-col justify-start space-x-0 space-y-2 px-3 py-4">
      <NavLinks links={links} />
    </div>
  );
}
