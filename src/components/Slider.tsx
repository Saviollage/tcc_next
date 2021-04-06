import Slider from "@material-ui/core/Slider/Slider";
import withStyles from "@material-ui/core/styles/withStyles";

export const CustomSlider = withStyles({
  root: {
    color: "#ff9000",
    height: 3,
    padding: "13px 0",
    fontSize: "1.3rem",
  },
  active: {
    height: 5,
    fontSize: "2rem",
  },
  track: {},
  rail: {
    color: "#bdd3de",
    opacity: 1,
    fontSize: "1.3rem",
  },
  markLabel: {
    color: "#2e384d",
    fontFamily: "Poiret One",
    fontWeight: "bolder",
    fontSize: "1.3rem",
  },
  valueLabel: {
    fontSize: "1.2rem",
  },
  thumb: {
    height: 10,
    width: 10,
  }
})(Slider);
