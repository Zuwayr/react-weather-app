import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 40,
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: 40,
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
    margin: "auto",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Weather = () => {
  const classes = useStyles();
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Lahore");

  const fetchApi = async () => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=7fda05aaf3ee4d16848190328210806&q=${search}&days=10&aqi=no&alerts=no`;
    const res = await fetch(url);
    const JSONres = await res.json();
    setCity(JSONres);
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4">
            Weather App
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="City"
            name="City"
            autoComplete="City"
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              fetchApi();
            }}
          >
            Search
          </Button>

          {!city ? null : (
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.image}
                      src={city.current.condition.icon}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="h5" gutterBottom>
                        {city.location.name}, {city.location.country}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {city.current.temp_c} °C, {city.current.condition.text}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        <b>Wind speed:</b> {city.current.wind_kph} KPH <br />
                        <b>Wind direction:</b> {city.current.wind_dir} <br />
                        <b>Humidity:</b> {city.current.humidity}
                        <br />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Paper>
      </div>
    </>
  );
};

export default Weather;
