
// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import MovieIcon from '@mui/icons-material/Movie';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import StarIcon from '@mui/icons-material/Star';
// import PersonIcon from '@mui/icons-material/Person';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; // Import SupervisorAccountIcon
// const Sidebar = ({ open, onClose, onSidebarClick }) => {
//   return (
//     <Drawer open={open} onClose={onClose} style={{ zIndex: 1100 }}>
//       <List style={{ backgroundColor: 'black' }}>
//         <ListItem button onClick={() => onSidebarClick('Dashboard')}>
//           <ListItemIcon>
//             <DashboardIcon style={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary={
//               <span style={{ color: 'white', fontWeight: 'bold' }}>
//                 Dashboard
//               </span>
//             }
//           />
//         </ListItem>
//         <ListItem button onClick={() => onSidebarClick('Movies')}>
//           <ListItemIcon>
//             <MovieIcon style={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary={
//               <span style={{ color: 'white', fontWeight: 'bold' }}>
//                 Movies
//               </span>
//             }
//           />
//         </ListItem>
//         <ListItem button onClick={() => onSidebarClick('Rating')}>
//           <ListItemIcon>
//             <StarIcon style={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary={
//               <span style={{ color: 'white', fontWeight: 'bold' }}>
//                 Rating
//               </span>
//             }
//           />
//         </ListItem>
//         <ListItem button onClick={() => onSidebarClick('Actors')}>
//           <ListItemIcon>
//             <PersonIcon style={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary={
//               <span style={{ color: 'white', fontWeight: 'bold' }}>
//                 Actors
//               </span>
//             }
//           />
//         </ListItem>
//         <ListItem button onClick={() => onSidebarClick('Directors')}>
//           <ListItemIcon>
//             <SupervisorAccountIcon style={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary={
//               <span style={{ color: 'white', fontWeight: 'bold' }}>
//                 Directors
//               </span>
//             }
//           />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const Sidebar = ({ open, onClose, onSidebarClick }) => {
  return (
    <Drawer open={open} onClose={onClose} style={{ zIndex: 1100 }}>
      <List style={{ backgroundColor: 'black' }}>
        <ListItem button onClick={() => onSidebarClick('Dashboard')}>
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Dashboard
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('Movies')}>
          <ListItemIcon>
            <MovieIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Movies
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('Rating')}>
          <ListItemIcon>
            <StarIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Rating
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('Actors')}>
          <ListItemIcon>
            <PersonIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Actors
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('Directors')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Directors
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('Reviewers')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} /> {/* You can change the icon for reviewers if needed */}
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Reviewers
              </span>
            }
          />
        </ListItem>
        
       
        <ListItem button onClick={() => onSidebarClick('Genres')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} /> {/* You can change the icon for reviewers if needed */}
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Genres
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('MovieCasts')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} /> {/* You can change the icon for reviewers if needed */}
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                MovieCasts
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('MovieGenres')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} /> {/* You can change the icon for reviewers if needed */}
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                MovieGenres
              </span>
            }
          />
        </ListItem>
        <ListItem button onClick={() => onSidebarClick('MovieDirection')}>
          <ListItemIcon>
            <SupervisorAccountIcon style={{ color: 'white' }} /> {/* You can change the icon for reviewers if needed */}
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                MovieDirection
              </span>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
