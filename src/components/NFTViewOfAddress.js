import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchURLS } from '../utils/fetchTokens';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import NFTCard from './NFTCard';

const NFT_FETCH_COUNT = 12;

// This is the component that displays the NFTs of a given address
function NFTViewOfAddress(props) {
  const { walletAddress } = useParams();
  const [myNfts, setMyNfts] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [lastTokenId, setLastTokenId] = useState(0);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMyTokens);

  useEffect(() => {
    fetchMyTokens();
    // showMoreTokens();
  }, []);

  async function showMoreTokens(myNfts) {
    let tokenURIPromises = [];
    let ownerPromises = [];
    let toIndex = Math.min(lastTokenId + NFT_FETCH_COUNT, myNfts.length);
    for (let i = lastTokenId; i < toIndex; i++) {
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

    setMetadata((prevState) => [...prevState, ..._metadata]);
    setIsFetching(false);
    setLastTokenId(toIndex);
  }

  async function fetchMyTokens() {
    console.log('fetching my items');
    const nfts = await props.contract.tokensOfOwner(walletAddress);
    setMyNfts(nfts);
    showMoreTokens(nfts);
  }

  return (
    <Container>
      {myNfts.length === 0 ? (
        <Row>
          <h2 style={{ padding: '10px' }}>
            This address does not has any NFT.
          </h2>
        </Row>
      ) : (
        <Row>
          {metadata.map((token, index) => {
            return <NFTCard key={index} token={token} />;
          })}
        </Row>
      )}
    </Container>
  );
}

export default NFTViewOfAddress;
