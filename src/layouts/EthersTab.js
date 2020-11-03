import React, { useState, useEffect } from "react";
import {
  Heading,
  Badge,
  Box,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/core";
import { ethers } from "ethers";

function EthersTab() {
  const [isEtherem, setIsEtherem] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [account, setAccount] = useState("0x0");
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(0);

  // check if ethereum is injected
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsEtherem(true);
    } else setIsEtherem(false);
  }, []);

  // connect metamask to app
  useEffect(() => {
    (async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsEnable(true);
        setAccount(account);
      } catch (e) {
        setIsEnable(false);
      }
    })();
  }, [isEtherem]);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const _balance = await provider.getBalance(account);
      const balance = ethers.utils.formatEther(_balance);
      setNetwork(network);
      setBalance(balance);
    })();
  }, [isEnable, account]);

  return (
    <VStack>
      <Heading mb={10}>Web3 with ethers.js</Heading>
      <Box mb={5}>
        Metamask status:{" "}
        {isEnable ? (
          <Badge colorScheme="green">connected</Badge>
        ) : (
          <Badge colorScheme="red">disconnect</Badge>
        )}
      </Box>
      {network !== null && (
        <UnorderedList>
          <ListItem mb={3}>
            Account: <Text as="b">{account}</Text>
          </ListItem>
          <ListItem mb={3}>
            Network name: <Text as="b">{network.name}</Text>
          </ListItem>
          <ListItem mb={3}>
            Network id: <Text as="b">{network.chainId}</Text>
          </ListItem>
          <ListItem mb={3}>
            Balance: <Text as="b">{balance}</Text>
          </ListItem>
        </UnorderedList>
      )}
    </VStack>
  );
}

export default EthersTab;
