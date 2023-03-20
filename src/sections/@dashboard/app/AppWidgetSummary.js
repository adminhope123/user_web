// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import '../../../pages/employeePage.css'
import CloseIcon from '@mui/icons-material/Close';
// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  imgIcon: PropTypes.any.isRequired,
  imgIconPresent: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  imgIconEmployeeIcon:PropTypes.any.isRequired,
  imgIconTimeTrackingIcon:PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  closeIconShow:PropTypes.any.isRequired,
  setCloseIconShow: PropTypes.any.isRequired,
  sx: PropTypes.object,
};

  export default function AppWidgetSummary({ title,imgIcon,imgIconPresent,imgIconEmployeeIcon,imgIconTimeTrackingIcon, total, icon,closeIconShow,setCloseIconShow,color= 'primary', sx, ...other }) {
    return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        height:"238px",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <div className='icon-icon'>
        {icon}
        </div>
        <img src={imgIconEmployeeIcon}/>
        <img src={imgIconTimeTrackingIcon}/>
        <img src={imgIconPresent}/>
        {
          closeIconShow===true&&(
            <div className='absent-data'>
        <div className='close-icon'>
        <CloseIcon/>
        </div>
        <img src={imgIcon}/>
        </div>
          )
        }
      </StyledIcon>
      {
        total===undefined ?    <Typography  sx={{fontSize:"23px",fontWeight:"500",marginBottom:"11px"}}>Data Refresh</Typography>:  <Typography variant="h3">{total}</Typography>
      }
  

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
