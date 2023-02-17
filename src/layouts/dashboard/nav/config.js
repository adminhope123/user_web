// component
import SvgColor from '../../../components/svg-color';
import TimerIcon from '@mui/icons-material/Timer';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Timer Clock',
    path: '/dashboard/timerClock',
    icon: <TimerIcon/>,
  },
  {
    title: 'Attendance List',
    path: '/dashboard/attendance-list',
    icon:<EventAvailableIcon/> ,
  },
  {
    title: 'Event',
    path: '/dashboard/event',
    icon: <EventIcon/>,
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
