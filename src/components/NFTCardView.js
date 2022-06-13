import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { fetchURLS } from '../utils/fetchTokens';
import NFTCard from './NFTCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import FilterComponent from './FilterComponent';
import { filterNFTs, initialFilterObj } from '../utils/filters';

// Number of tokens to fetch NFTs from the blockchain
const NFT_FETCH_COUNT = 12;

// This is the component that displays the NFTs to explore the network
function NFTCardView(props) {
  const [metadata, setMetadata] = useState([]);
  const [lastTokenId, setLastTokenId] = useState(0);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreTokens);
  const [attributes, setAttributes] = useState(null);
  // Infinite scroll hook
  const [filter, setFilter] = useState(initialFilterObj);

  useEffect(() => {
    fetchMoreTokens();
  }, []);

  // Infinite scroll hook callback function when scrool donw to the bottom this function is called
  async function fetchMoreTokens() {
    console.log('fetching more items');
    let tokenURIPromises = [];
    let ownerPromises = [];
    for (let i = lastTokenId; i < lastTokenId + NFT_FETCH_COUNT; i++) {
      tokenURIPromises.push(props.contract.tokenURI(i));
      ownerPromises.push(props.contract.ownerOf(i));
    }
    const urls = await Promise.all(tokenURIPromises);
    const owners = await Promise.all(ownerPromises);

    let _metadata = await fetchURLS(urls);
    _metadata = _metadata.map((m, index) => ({
      ...m,
      owner: owners[index],
    }));
    console.log(_metadata);
    let metadata_ = [...metadata, ..._metadata];

    setMetadata((prevState) => [...prevState, ..._metadata]);
    setIsFetching(false);
    setLastTokenId(lastTokenId + NFT_FETCH_COUNT);

    const rarities = new Set(metadata_.map((m) => m.attributes[0].value));
    const names = new Set(metadata_.map((m) => m.attributes[1].value));
    const classes = new Set(metadata_.map((m) => m.attributes[2].value));
    const tendencies = new Set(metadata_.map((m) => m.attributes[3].value));

    const attributes = {
      rarities: Array.from(rarities),
      names: Array.from(names),
      classes: Array.from(classes),
      tendencies: Array.from(tendencies),
    };
    setAttributes(attributes);
    console.log(rarities);
  }

  return (
    <React.Fragment>
      <Container>
        <p style={{ textAlign: 'left' }}>
          Showing {filterNFTs(metadata, filter).length} of tokens. Scroll down
          to load more.
        </p>
      </Container>

      {attributes && (
        <FilterComponent
          attributes={attributes}
          setFilter={setFilter}
          filter={filter}
        />
      )}
      <Container>
        <Row>
          {filterNFTs(metadata, filter).map((token, index) => {
            return <NFTCard key={index} token={token} />;
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default NFTCardView;
