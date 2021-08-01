import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  pagination: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

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

export type ResultsInfoProps = {
  currentPage: number;
  includeResults?: boolean;
  paginationPageCount: number;
  searchQuery: string;
  setCurrentPage: (page: number) => void;
  userCountResults: number;
};

export const ResultsInfo = ({
  currentPage,
  includeResults = false,
  paginationPageCount,
  searchQuery,
  setCurrentPage,
  userCountResults,
}: ResultsInfoProps): JSX.Element => {
  const classes = useStyles();

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
