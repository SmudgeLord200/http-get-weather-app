import React from "react";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { WeatherData } from "../type";

type Props = {
  weather: WeatherData | null;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Stack direction="column" spacing={1}>
          <CardMedia
            sx={{ width: 100 }}
            component="img"
            image={`https:${weather?.current.condition.icon}`}
            alt="Weather Condition Icon"
          />
          <Typography>{weather?.current.condition.text}</Typography>
        </Stack>
        <CardContent>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {weather?.current.temp_c}°C
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {weather?.location.name}, {weather?.location.country}
            </Typography>
            <Typography variant="subtitle2">
              {weather?.location?.localtime ? new Date(weather?.location?.localtime).toDateString() : "N/A"}
            </Typography>
            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="subtitle2" sx={{ fontStyle: "italic", }}>
              Feels like {weather?.current.feelslike_c}°C
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic", fontSize: "0.8rem" }}
            >
              *Last Updated:{" "}
              {weather?.current?.last_updated ? new Date(weather?.current?.last_updated).toUTCString() : "N/A"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>Wind (kph)</Typography>
            <AirIcon sx={{ color: "#757ce8" }} />
            <Typography>{weather?.current.wind_kph}</Typography>
          </Box>
          <Box>
            <Typography>Humidity (%)</Typography>
            <WaterDropIcon sx={{ color: "#3f50b5" }} />
            <Typography>{weather?.current.humidity}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default WeatherCard;
