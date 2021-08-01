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
    float: "right",
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
  return (
    <>
      {includeResults &&
        (userCountResults !== 0 ? (
          <>
            <b>Results: </b>
            {searchQuery !== ""
              ? userCountResults + " for " + searchQuery
              : userCountResults}
          </>
        ) : (
          <>{"No Results Found for " + searchQuery}</>
        ))}
      {userCountResults > 20 && (
        <Pagination
          count={paginationPageCount}
          variant="outlined"
          className={classes.pagination}
          page={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </>
  );
};
