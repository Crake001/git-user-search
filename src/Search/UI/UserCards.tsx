import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import {
  Email,
  Visibility,
  VisibilityTwoTone,
  LocationOn,
  Person,
} from "@material-ui/icons";
import { userResult } from "../SearchResults";
import { CardText } from "./CardText";

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 800,
    animation: "$bounce ease .85s",
    animationIterationCount: 1,
    animationFillMode: "forwards",
  },
  "@keyframes bounce": {
    "0%": {
      opacity: 0,
      transform: "scale(.3)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.003)",
    },
    "75%": {
      transform: "scale(.93)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  actionArea: {
    minHeight: 750,
  },
  cardContent: {
    margin: "auto",
    minHeight: 250,
  },
  smallerIcon: {
    fontSize: 16,
    paddingRight: 2,
  },
}));

export type UserCardProps = {
  userInfo: userResult[];
};

export const UserCards = ({ userInfo }: UserCardProps): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {userInfo &&
        userInfo.map((user, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card
              className={classes.card}
              onClick={() => {
                window.open(user.node.url, "_blank");
              }}
            >
              <CardActionArea className={classes.actionArea}>
                <CardMedia
                  component="img"
                  alt={user.node?.name}
                  height="500"
                  image={user.node?.avatarUrl}
                  title={user.node?.name}
                />
                <CardContent className={classes.cardContent}>
                  <CardText header value={user.node?.name} />
                  <CardText
                    icon={<Person className={classes.smallerIcon} />}
                    value={user.node?.login}
                  />
                  <CardText
                    icon={<Email className={classes.smallerIcon} />}
                    value={user.node?.email}
                  />
                  <CardText
                    icon={<Visibility className={classes.smallerIcon} />}
                    value={user.node?.followers?.totalCount.toString()}
                    margins
                  />
                  <CardText
                    icon={<VisibilityTwoTone className={classes.smallerIcon} />}
                    value={user.node?.following?.totalCount.toString()}
                  />
                  <CardText margins value={user.node?.bio} />
                  <CardText
                    margins
                    bottom
                    icon={<LocationOn />}
                    value={user.node.location}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </>
  );
};
