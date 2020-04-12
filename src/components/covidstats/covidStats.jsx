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
    fetch("https://api.covid19api.com/summary")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ data })
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
    let found = this.state.data.Countries.find( x => x.Country === selectedItem);

    this.setState({
      selectedItem: found
    })
  }

  render() {
    const { data, selectedItem } = this.state;
    return (
      <div>
        { data.Global && 
          <div className="flex-container">
            <div className="box">
              <span className="title">Nuevos Confirmados:</span> <br />
              {data.Global.NewConfirmed}
            </div>
            <div className="box">
              <span className="title">Total Confirmados:</span><br />
              {data.Global.TotalConfirmed}
            </div>
            <div className="box">
              <span className="title">Nuevas Muertes:</span><br />
              {data.Global.NewDeaths}
            </div>
            <div className="box">
              <span className="title">Total Muertes:</span><br />
              {data.Global.TotalDeaths}
            </div>
            <div className="box">
              <span className="title">Nuevos Recuperados:</span><br />
              {data.Global.NewRecovered}
            </div>
            <div className="box">
              <span className="title">Total Recuperados:</span><br />
              {data.Global.TotalRecovered}
            </div>

            <div className="country-selector">
              <div className="autocomplete">
                <AutoComplete updateSelectedItem={this.updateSelectedItem} />
              </div>
              { selectedItem && 
                <div className="flex-container">
                  <div className="box">
                    <span className="title">Nuevos Confirmados:</span> <br /> {selectedItem.NewConfirmed} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div className="box">
                    <span className="title">Total Confirmados:</span> <br /> {selectedItem.TotalConfirmed} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div className="box">
                    <span className="title">Nuevas Muertes:</span> <br /> {selectedItem.NewDeaths} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div className="box">
                    <span className="title">Total Muertes:</span> <br /> {selectedItem.TotalDeaths} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div className="box">
                    <span className="title">Nuevos Recuperados:</span> <br /> {selectedItem.NewRecovered} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div className="box">
                    <span className="title">Total Recuperados:</span> <br /> {selectedItem.TotalRecovered} <br/> <span className="title">{Moment(selectedItem.Date).format("DD-MM-YYYY HH:mm")}</span>
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
