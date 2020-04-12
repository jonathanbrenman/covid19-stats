/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../../data/countries';
import './styles.css';


class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: countries
    };
  }
  // ISO 3166-1 alpha-2
  // ⚠️ No support for IE 11
  countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

  render() {
    let { countries } = this.state;
    return (
      <Autocomplete
        id="country-select"
        onInputChange={this.props.updateSelectedItem}
        options={countries}
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>
            <span>{this.countryToFlag(option.code)}</span>
            {option.label} ({option.code})
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Escoja un pais"
            variant="outlined"
            inputProps={{
              ...params.inputProps
            }}
          />
        )}
      />
    );
  }
}

export default AutoComplete