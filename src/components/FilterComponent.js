import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { initialFilterObj } from '../utils/filters';
import FilterInputBox from './FilterInputBox';

// This is the component that displays the filter options and add filter button
function FilterComponent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReset = () => {
    setShow(false);
    props.setFilter(initialFilterObj);
  };

  return (
    <>
      <Container>
        <Button
          style={{ marginBottom: '30px', float: 'left' }}
          variant="secondary"
          onClick={handleShow}
        >
          Add Filters
        </Button>
      </Container>
      <br />
      <br />
      <br />

      {/* Just Modal JSX */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Filter</Modal.Title>
        </Modal.Header>
        <Container>
          <Row>
            <Col>Rarity</Col>
            <Col>
              <Multiselect
                isObject={false}
                showArrow={true}
                onRemove={(e) => {
                  props.setFilter((prev) => ({ ...prev, rarity: e }));
                }}
                onSelect={(e) => {
                  props.setFilter((prev) => ({ ...prev, rarity: e }));
                }}
                options={props.attributes.rarities}
                selectedValues={props.filter.rarity}
              />
            </Col>
          </Row>
          <Row>
            <Col>Name</Col>
            <Col>
              <Multiselect
                isObject={false}
                showArrow={true}
                onRemove={(e) => {
                  props.setFilter((prev) => ({ ...prev, name: e }));
                }}
                onSelect={(e) => {
                  props.setFilter((prev) => ({ ...prev, name: e }));
                }}
                options={props.attributes.names}
                selectedValues={props.filter.name}
              />
            </Col>
          </Row>
          <Row>
            <Col>Class</Col>
            <Col>
              <Multiselect
                isObject={false}
                showArrow={true}
                onRemove={(e) => {
                  props.setFilter((prev) => ({ ...prev, class: e }));
                }}
                onSelect={(e) => {
                  props.setFilter((prev) => ({ ...prev, class: e }));
                }}
                options={props.attributes.classes}
                selectedValues={props.filter.class}
              />
            </Col>
          </Row>
          <Row>
            <Col>Tendency</Col>
            <Col>
              <Multiselect
                isObject={false}
                showArrow={true}
                onRemove={(e) => {
                  props.setFilter((prev) => ({ ...prev, tendency: e }));
                }}
                onSelect={(e) => {
                  props.setFilter((prev) => ({ ...prev, tendency: e }));
                }}
                options={props.attributes.tendencies}
                selectedValues={props.filter.tendency}
              />
            </Col>
          </Row>
          <Row>
            <Col>Generation</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'generation'}
                value={props.filter.generation.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'generation'}
                value={props.filter.generation.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
          <Row>
            <Col>Level</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'level'}
                value={props.filter.level.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'level'}
                value={props.filter.level.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
          <Row>
            <Col>Attack</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'attack'}
                value={props.filter.attack.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'attack'}
                value={props.filter.attack.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
          <Row>
            <Col>Defence</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'defence'}
                value={props.filter.defence.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'defence'}
                value={props.filter.defence.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
          <Row>
            <Col>Endurance</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'endurance'}
                value={props.filter.endurance.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'endurance'}
                value={props.filter.endurance.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
          <Row>
            <Col>Item Slots</Col>
            <Col>
              <FilterInputBox
                type={'min'}
                attribute={'itemSlots'}
                value={props.filter.itemSlots.min}
                setFilter={props.setFilter}
              />
            </Col>
            <Col>
              <FilterInputBox
                type={'max'}
                attribute={'itemSlots'}
                value={props.filter.itemSlots.max}
                setFilter={props.setFilter}
              />
            </Col>
          </Row>
        </Container>

        <Modal.Footer>
          <Button variant="success" onClick={handleReset}>
            Reset Filter
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterComponent;
