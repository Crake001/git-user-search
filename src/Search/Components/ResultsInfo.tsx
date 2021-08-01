import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

export type ResultsInfoProps = {
  userCountResults: number;
  searchQuery: string;
  paginationPageCount: number;
  includeResults?: boolean;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

export const ResultsInfo = ({
  userCountResults,
  searchQuery,
  paginationPageCount,
  includeResults = false,
  setCurrentPage,
  currentPage,
}: ResultsInfoProps): JSX.Element => {
  const classes = useStyles();

  const formatResults = (count: number, query: string): JSX.Element => {
    let stringResults: JSX.Element = <></>;

    if (count === 0) {
      stringResults = <>{"No Results Found for " + query}</>;
    }
    if (count > 1000) {
      stringResults = (
        <>
          <b>Results: </b> 1,000+
        </>
      );
    }
    if (count > 0 && count < 1000) {
      stringResults = (
        <>
          <b>Results: </b>
          {count.toString() + " for " + query}
        </>
      );
    }
    return stringResults;
  };

  return (
    <>
      {includeResults && formatResults(userCountResults, searchQuery)}
      {userCountResults > 20 && (
        <Pagination
          count={paginationPageCount}
          variant="outlined"
          className={classes.pagination}
          page={currentPage}
          siblingCount={0}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </>
  );
};
