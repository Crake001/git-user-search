import { InputBase, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { SearchResults } from "./Search/SearchResults";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    background: "#04b8e1",
    paddingBottom: 10,
  },
  pageContainer: {
    maxWidth: 1600,
    margin: "auto",
    paddingLeft: 20,
    paddingRight: 20,
  },
  pageTitle: {
    textAlign: "center",
    width: "100%",
    fontFamily: "'Bungee Shade', cursive",
    color: "#e3ff7e",
    fontSize: 50,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      lineHeight: 1.5,
    },
    [theme.breakpoints.down("xs")]: {
      lineHeight: 1.25,
    },
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    marginTop: 0,
  },
  input: {
    flex: 1,
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [searchQuery] = useDebounce(currentQuery, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.pageContainer}>
          <p className={classes.pageTitle}>GITHUB USER SEARCH</p>

          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Github"
              inputProps={{ "aria-label": "search github" }}
              onChange={(event) => {
                setCurrentPage(1);
                setCurrentQuery(event.target.value);
              }}
            />
          </Paper>
        </div>
      </div>
      <div className={classes.pageContainer}>
        <SearchResults
          searchQuery={searchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default App;
