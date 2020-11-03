import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  FormControl,
  Input,
  HStack,
  Button,
  Center,
  UnorderedList,
  ListItem,
} from "@chakra-ui/core";

function FetchTab() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <Center>
        <Heading mb={10}>Fetch content with useEffect hook</Heading>
      </Center>
      <form
        onSubmit={(event) => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <FormControl id="search-term" isRequired>
          <HStack>
            <Input
              type="text"
              value={query}
              placeholder="react"
              mb={5}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button type="submit" colorScheme="blue" mb={5}>
              Search
            </Button>
          </HStack>
        </FormControl>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <UnorderedList>
          {data.hits.map((item) => (
            <ListItem key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Fragment>
  );
}

export default FetchTab;
