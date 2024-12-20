import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  //Function to fetch weather data for the provided location
  getWeather: (param: string) => Promise<void>;
}

const SearchBar: React.FC<Props> = ({ getWeather }) => {
  const [input, setInput] = useState<string>("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onBtnClick = () => {
    getWeather(input);
  };

  return (
    <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>Search Weather</Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          id="searchBar"
          variant="outlined"
          placeholder="Search..."
          required
          value={input}
          onChange={onInputChange}
          sx={{
            "& .MuiInputBase-input": {
              color: "white", // Text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color for outlined variant
            },
          }} />
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", }}
          disabled={!input}
          onClick={onBtnClick}
        >
          Search
        </Button>
      </Stack>
      <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>*<a href="https://www.weatherapi.com/docs/#intro-request" target="_blank">search</a> by country name, post code, etc.</Typography>
    </Stack>
  );
};

export default SearchBar;
