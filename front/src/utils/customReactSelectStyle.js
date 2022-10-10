export const customSelectStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'green' : 'black',
        padding: 20,
      })
}