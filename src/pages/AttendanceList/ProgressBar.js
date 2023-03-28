import './AttendanceList.css'
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

export default function ProgressBar({  widthData  }) {
    const myEffectExit = keyframes`
    from {
        clip-path: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      }
      to {
        clip-path: polygon(0 0, calc(${widthData} * 1%) 0, calc(${widthData} * 1%) 100%, 0 100%);
    }
    `;
    // clip-path:'polygon(0 0, calc(10 * 1%) 0, calc(10 * 1%) 100%, 0 100%)',
    const RangeBox = styled('div')(({ theme }) => ({
        backgroundColor: '#eee',
        borderRadius: '15px',
        display: 'flex',
        border:'1px solid #c1bcbc',
        height: '16px',
        "&::before": {
            content: '""',
            borderRadius: '15px',
            height: '16px',
            background: 'linear-gradient(to right, #fa3756 0%, #fecb2f 50%, #00bb98 100%)',
            width: '100%',
            animation:` ${myEffectExit} 1s ease-in-out forwards`
          }
      }));
    return (
        <div>
           <RangeBox >
            </RangeBox>
        </div>
    )
}
