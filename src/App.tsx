import { InputBase, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { SearchResults } from "./Search/SearchResults";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    background: "#000000",
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
    textShadow: "8px 1px #f00",
    fontSize: 50,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      lineHeight: 1.5,
      marginBottom: 10,
    },
    [theme.breakpoints.down("xs")]: {
      lineHeight: 1.25,
      marginBottom: 10,
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

          <Paper className={classes.root} component="form">
            <InputBase
              className={classes.input}
              onChange={(event) => {
                setCurrentPage(1);
                setCurrentQuery(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="Search Github"
            />
          </Paper>
        </div>
      </div>
      <div className={classes.pageContainer}>
        <SearchResults
          currentPage={currentPage}
          searchQuery={searchQuery}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default App;
