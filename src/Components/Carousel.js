import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "MAKEUP",
    imgPath: "assets/images/makeup.jpeg",
    category: "makeup"
  },
  {
    label: 'ACCESSORY',
    // imgPath: 'assets/images/melody.jpeg',
    imgPath: 'assets/images/sampleProductImg.png',
    category: "accessory"
  },
  {
    label: 'CLOTHING',
    imgPath: 'assets/images/clothes.png',
    category: "clothing"
  },
  {
    label: 'MISCELLANEOUS',
    imgPath: 'assets/images/Miscellaneous.jpeg',
    category: 'miscellaneous'
  }
];

function Carousel(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: 'background.default'
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography sx={{ fontWeight: 'bold '}}>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label} style={{display:'flex', justifyContent:'center' }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                elevation={10}
                sx={{
                  height: 637.5,
                  display: "block",
                  maxWidth: 1000,
                  overflow: "hidden",
                  width: "100%",
                  alignContent: 'center', 
                  backgroundColor: "blue",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  },
                  '&:active': {
                    transform: 'scale(0.95)'
                  }
                }}
                src={step.imgPath}
                alt={step.label}
                onClick={() => props.handleCategoryFilter(step.category)}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Carousel;
