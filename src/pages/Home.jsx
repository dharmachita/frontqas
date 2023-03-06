import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
//import AskConfirmationBeforeSave from '../testdata/test';

const Home = () => {
    return ( 
        <div>
            <h1>Home</h1>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <h3>chart</h3>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <h3>Deposits</h3>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <h3>Orders</h3>
                </Paper>
              </Grid>
        </Grid>
        {/*<AskConfirmationBeforeSave />*/}
        </div>
     );
}
 
export default Home;