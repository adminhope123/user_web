import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import POSTS from '../../../_mock/blog';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  textTransform:"capitalize",
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ postData, index }) {
  const { image,birthDate,fullname,post,cover,city, title, view, comment, share, author, createdAt } = postData;
  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={ 6} md={ 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          {
            POSTS?.map((item)=>{
              return(
                <StyledAvatar
                alt={item}
                src={item?.author?.avatarUrl}
              />
              )
            })
          }
          <StyledCover alt={fullname} src={`https://hopeusers.hopeinfosys.com/${image}`} />
        </StyledCardMedia>

        <CardContent
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {birthDate}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {fullname}
          </StyledTitle>
          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {city}
          </StyledTitle>
          <StyledInfo>
            {POST_INFO?.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <img icon={info.icon} />
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
