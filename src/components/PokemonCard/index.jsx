import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box } from "@mui/system";

export default function PokemonCard({ name, image, types }) {
  const typeHandle = () => {
    if (types[1]) {
      // Se este tipo existir (quer dizer, mais de um)
      return types[0].type.name + " | " + types[1].type.name; // Retorna o primeiro tipo mais o segundo tipo
    }
    return types[0].type.name; // Se não for o caso, retorna somente o primeiro tipo
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div" textAlign="center">
              {typeHandle()}
            </Typography>
          </Box>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
    </Card>
  );
}
