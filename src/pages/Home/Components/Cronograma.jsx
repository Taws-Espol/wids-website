import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { StyledPaper, StyledTimelineConnector } from "./ComponentStyleCro";
import { timelineEvents } from "../../../data/info-timeline.js";

export default function Cronograma() {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
          fontFamily: '"Merriweather", serif',
          fontStyle: "normal",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "31px",
        }}
      >
        Cronograma
      </Typography>
      <Timeline align="alternate">
        {timelineEvents.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {event.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot style={{ backgroundColor: event.dotColor }}>
                <event.icon size="2em" style={{ color: "#ffff" }} />
              </TimelineDot>
              {index < timelineEvents.length - 1 && <StyledTimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <StyledPaper elevation={3}>
                <Typography variant="h6" component="h1">
                  {event.title}
                </Typography>
                <Typography>{event.description}</Typography>
              </StyledPaper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
