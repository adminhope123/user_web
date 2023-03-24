import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './employeePage.css'
// @mui
import { Box, Container, Stack, Tab, Tabs, tabsClasses, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataApi } from 'src/Redux/actions';
import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------

const titleData=[
  {}
]

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const  dispatch=useDispatch() 
  const {users}=useSelector(res=>res.data)
  
  const getEmployeeAll=()=>{
      dispatch(getUserDataApi())
    }
  
    useEffect(() => {
      getEmployeeAll()
    }, [])
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <>
     <div className='employee-page'>
     <Helmet>
        <title> Dashboard: Employee |  User Web </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Employee
        </Typography>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
              <ProductSort />
          </Stack>
        </Stack>
          
             <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
     </div>
    </>
  );
}
