import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import MasksList from "../MasksList";

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
  },
  card: {
    margin: "25px",
  },
});

const Main = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      {props.users.map((user) => (
        <Card key={user.uuid} className={classes.card}>
          <MasksList user={user} />
        </Card>
      ))}
    </main>
  );
};

export default Main;
