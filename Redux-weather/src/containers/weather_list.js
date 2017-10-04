import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
class WeatherList extends Component {
    
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const { lon, lat } = cityData.city.coord;

        
     return (
         <tr key={ name }>
             <td> <GoogleMap lat={lat} lon={lon}  />  </td>
             <td><Chart data={ temps }  color="orange"  units="ºC"/></td>
            <td><Chart data={ pressures }  color="orange" units="hPa"/></td>
            <td><Chart data={ humidities }  color="orange" units="%"/></td>
         </tr>
     )   
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>도시</th>
                        <th>온도</th>
                        <th>기압</th>
                        <th>습도</th>
                    </tr>
                </thead>
                
                <tbody>
                    { this.props.weather.map(this.renderWeather) }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = ({ weather }) => {
    return { weather };
};

export default connect(mapStateToProps)(WeatherList);
