import { makeStyles, Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResultsInfo } from "./UI/ResultsInfo";
import { UserCards } from "./UI/UserCards";

const useStyles = makeStyles(() => ({
  resultsContainer: {
    marginTop: 20,
    paddingTop: 20,
    maxWidth: 1600,
    margin: "auto",
  },
  gridMargin: {
    margin: "auto",
  },
  loadingContainer: {
    margin: "auto",
    width: "max-content",
    marginTop: "40vh",
  },
}));

export type userResult = {
  node: {
    url: string;
    avatarUrl: string;
    name: string;
    login: string;
    email: string;
    following: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    bio: string;
    location: string;
  };
};

export type SearchResultsProps = {
  searchQuery: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const SearchResults = ({
  searchQuery,
  currentPage,
  setCurrentPage,
}: SearchResultsProps): JSX.Element => {
  const classes = useStyles();

  const [userInfoResults, setUserInfoResults] = useState<userResult[]>();
  const [userCountResults, setUserCountResults] = useState<number>();
  const [paginationPageCount, setPaginationPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createQuery = (searchQuery: string, startCursor: string) => {
    const query = `query($searchQuery:String!,$startCursor: String!) {
      search(query: $searchQuery, type: USER, first: 20, after: $startCursor ) {
          userCount
          edges {
              node {
                  ... on User {
                      url
                      avatarUrl
                      name
                      login
                      email
                      following {
                        totalCount
                      }
                      followers {
                        totalCount
                      }
                      bio
                      location
                  }
              }
          }
      }
  }`;
    return query;
  };

  useEffect(() => {
    const startCursor = Buffer.from(
      "cursor:" + ((currentPage - 1) * 20).toString(),
      "utf-8"
    ).toString("base64");
    setIsLoading(true);
    const getData = async () => {
      await axios
        .post(
          "https://api.github.com/graphql",
          {
            query: createQuery(searchQuery, startCursor),
            variables: {
              searchQuery: searchQuery,
              startCursor: startCursor,
            },
          },
          {
            headers: {
              Authorization: `bearer ${process.env.REACT_APP_GH_ACCESS_TOKEN}`,
            },
          }
        )
        .then((response) => {
          setUserInfoResults(response.data.data.search.edges);
          setUserCountResults(response.data.data.search.userCount);
          setPaginationPageCount(
            Math.ceil(
              response.data.data.search.userCount < 1000
                ? response.data.data.search.userCount / 20
                : 1000 / 20
            )
          );
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [searchQuery, currentPage]);

  return !isLoading ? (
    <div className={classes.resultsContainer}>
      <ResultsInfo
        userCountResults={userCountResults ? userCountResults : 0}
        searchQuery={searchQuery}
        paginationPageCount={paginationPageCount}
        includeResults
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Grid container item spacing={3} xs={12} className={classes.gridMargin}>
        <UserCards userInfo={userInfoResults ?? []} />
      </Grid>
      <ResultsInfo
        userCountResults={userCountResults ? userCountResults : 0}
        searchQuery={searchQuery}
        paginationPageCount={paginationPageCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  ) : (
    <div className={classes.loadingContainer}>
      <div style={{}}>
        <CircularProgress size={100} />
      </div>
    </div>
  );
};
