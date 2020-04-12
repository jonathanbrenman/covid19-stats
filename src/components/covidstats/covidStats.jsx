import React from 'react';
import AutoComplete from '../autocomplete/autocomplete'
import countries from '../../data/countries';
import Moment from 'moment';
import './styles.css';

class CovidStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedItem: false
    };

    this.updateSelectedItem = this.updateSelectedItem.bind(this)
  }

  getCovidInfo() {
    fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ data: data.data.rows[0] })
    })
    .catch(err => {
      console.log(err);
    });
  }

  getCovidInfoByCountry(countryName) {
    fetch(`https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${countryName}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ selectedItem: data.data.rows[0] })
    })
    .catch(err => {
      console.log(err);
    });
  }

  

  componentDidMount() {
    this.getCovidInfo();
  }

  updateSelectedItem(event) {
    if (event.currentTarget.id === "country-select") { return }
    let target = parseInt(event.currentTarget.id.split("-")[3]);
    if (!countries[target]) { return }
    let selectedItem = countries[target].label;
    this.getCovidInfoByCountry(selectedItem);
  }

  render() {
    const { data, selectedItem } = this.state;
    return (
      <div>
        { data && 
          <div className="flex-container">
            <div className="box">
              <span className="title">Total Confirmados:</span><br />
              {data.total_cases}
            </div>
            <div className="box">
              <span className="title">Casos Activos:</span><br />
              {data.active_cases}
            </div>
            <div className="box">
              <span className="title">Total Recuperados:</span><br />
              {data.total_recovered}
            </div>
            <div className="box">
              <span className="title">Nuevos Confirmados:</span> <br />
              {data.new_cases}
            </div>
            <div className="box">
              <span className="title">Total Muertes:</span><br />
              {data.total_deaths}
            </div>
            <div className="box">
              <span className="title">Nuevas Muertes:</span><br />
              {data.new_deaths}
            </div>

            <div className="country-selector">
              <div className="autocomplete">
                <AutoComplete updateSelectedItem={this.updateSelectedItem} />
              </div>
              { selectedItem && 
                <div className="flex-container">
                <div>
                  <img className="box img" src={selectedItem.flag} />
                </div>
                  <div className="box">
                    <span className="title">Nuevos Confirmados:</span> <br /> {selectedItem.new_cases}
                  </div>
                  <div className="box">
                    <span className="title">Total Confirmados:</span> <br /> {selectedItem.total_cases}
                  </div>
                  <div className="box">
                    <span className="title">Nuevas Muertes:</span> <br /> {selectedItem.new_deaths}
                  </div>
                  <div className="box">
                    <span className="title">Total Muertes:</span> <br /> {selectedItem.total_deaths}
                  </div>
                  <div className="box">
                    <span className="title">Nuevos Activos:</span> <br /> {selectedItem.active_cases}
                  </div>
                  <div className="box">
                    <span className="title">Total Recuperados:</span> <br /> {selectedItem.total_recovered}
                  </div>
                  <div className="box">
                    <span className="title">Estado Critico:</span> <br /> {selectedItem.serious_critical}
                  </div>
                  <div className="box">
                    <span className="title">Casos cada Mil (poblacion):</span> <br /> {selectedItem.cases_per_mill_pop}
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default CovidStats
