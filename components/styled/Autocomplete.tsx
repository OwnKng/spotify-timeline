import Downshift from 'downshift'
import styled from 'styled-components'

type AutocompleteProps = {
    setValue: () => void,
    items: [{
        artist: string
        date: string
    }],
    className: string
}

const Autocomplete = ({ setValue, items, className }: AutocompleteProps) => (
  <div className={className}>
    <Downshift onChange={(selection) => setValue(selection)} itemToString={(item) => (item || '')}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div className="autocomplete">
          <div
            style={{ display: 'inline-block', width: '100%' }}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                .filter((item) => !inputValue || item.toLowerCase().includes(inputValue.toLowerCase()))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item,
                      index,
                      item,
                      style: {
                        backgroundColor:
                            highlightedIndex === index ? 'var(--color-input-selected)' : 'var(--color-input)',
                      },
                    })}
                  >
                    <span>
                      {item}
                    </span>
                  </li>
                )) : null}
          </ul>
        </div>
      )}
    </Downshift>
  </div>
)

export default styled(Autocomplete)/* css */`
  position: relative;
  flex-basis: 2;
  
  ul {
    position: absolute;
    width: 100%;
    padding: 0;
    margin: 0px auto;
    list-style: none;
    z-index: 10;
    max-height: 600px;
    overflow: scroll;
  }

  li {
    padding: 1rem 0.5rem;
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    z-index: 10;
  }
`
