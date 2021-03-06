// This is the component that displays the numeric filter input box
function FilterInputBox(props) {
  if (props.type === 'min') {
    return (
      <input
        style={{ width: '100px' }}
        type="number"
        placeholder={props.type}
        value={props.value}
        onChange={(e) => {
          props.setFilter((prev) => {
            let newState = { ...prev };
            newState[props.attribute] = {
              ...prev[props.attribute],
              min: e.target.value,
            };
            return newState;
          });
        }}
      />
    );
  } else {
    return (
      <input
        style={{ width: '100px' }}
        type="number"
        placeholder={props.type}
        value={props.value}
        onChange={(e) => {
          props.setFilter((prev) => {
            let newState = { ...prev };
            newState[props.attribute] = {
              ...prev[props.attribute],
              max: e.target.value,
            };
            return newState;
          });
        }}
      />
    );
  }
}

export default FilterInputBox;
