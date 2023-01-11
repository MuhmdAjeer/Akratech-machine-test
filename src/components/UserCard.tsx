import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";



function UserCard(props:any) {
  return (
    <Card
      sx={{
        minWidth: 255,
        maxWidth: 255,
        height: 200,
        margin: 2,
        backgroundColor: "black",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt="Remy Sharp"
          src={props.user.picture.large}
        />
        <span style={{ color: "whitesmoke", margin: "10px" }}>
          {`${props.user?.name?.first} ${props.user?.name?.last}`}
        </span>
        <Button onClick={()=>props.delete(props.user?.login?.uuid)} variant="contained" size="small">
          Delete
        </Button>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default UserCard;
