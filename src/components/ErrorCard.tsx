import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

type Props = {
  error: string;
}

const ErrorCard: React.FC<Props> = ({ error }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          color="error"
          sx={{ fontWeight: "bold" }}
        >
          {error}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
