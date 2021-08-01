import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  heading: {
    marginBottom: 2,
  },
  infoContainerSmall: {
    margin: 2,
    display: "flex",
    alignItems: "center",
  },
  infoContainerLarge: {
    margin: "10px 2px 2px 2px",
    display: "flex",
    alignItems: "center",
  },
}));

export type CardTextProps = {
  header?: boolean;
  icon?: JSX.Element;
  margins?: boolean;
  value: string;
};

export const CardText = ({
  header = false,
  icon,
  value,
  margins,
}: CardTextProps): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {header ? (
        <h1 className={classes.heading}>{value}</h1>
      ) : (
        <>
          {value && (
            <span
              className={
                margins
                  ? classes.infoContainerLarge
                  : classes.infoContainerSmall
              }
            >
              {icon && icon}
              {value}
            </span>
          )}
        </>
      )}
    </>
  );
};
