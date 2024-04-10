import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem from '@mui/lab/TimelineItem';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff', 
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 2px 4px, 
              rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, 
              rgba(0, 0, 0, 0.1) 0px -3px 0px inset`,
  marginBottom: theme.spacing(3),
  maxWidth: '210px',
  '&:hover': {
    boxShadow: `rgba(0, 0, 0, 0.2) 0px 8px 26px, 
                rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, 
                rgba(0, 0, 0, 0.1) 0px -3px 0px inset`, 
  },
  transition: 'box-shadow 0.3s ease-in-out', 
}));

export const StyledTimelineConnector = styled(TimelineConnector)(({ theme }) => ({
  backgroundColor: '#8946F0',
  height: '50px', 
  width: '5px',
  borderRadius: '4px'
}));

export const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  '&:before': { 
    display: 'none',
  },
  marginBottom: theme.spacing(3), 
}));