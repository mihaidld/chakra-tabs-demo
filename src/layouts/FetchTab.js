import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  FormControl,
  Input,
  HStack,
  VStack,
  Button,
  Link,
  UnorderedList,
  ListItem,
  Spinner,
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
    <VStack>
      <Heading mb={10}>Fetch content with useEffect hook</Heading>
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
        <Spinner />
      ) : (
        <UnorderedList>
          {data.hits.map((item) => (
            <ListItem key={item.objectID}>
              <Link href={item.url}>{item.title}</Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </VStack>
  );
}

export default FetchTab;
