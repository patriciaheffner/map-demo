import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createMap } from './actions/map';
import FeatureLayer from 'esri/layers/FeatureLayer'

const mapStateToProps = (state) => {
  return {
    mapCtrl: state.map.mapCtrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMap: (domNode) => {
      dispatch(createMap(domNode))
    }
  }
}

class Counter extends Component { 
  render() {
    const {clickCount} = this.props
    return <div>Click Counter: {clickCount}</div>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    }
  }

  componentDidMount() {
    if (!this.props.mapCtrl) {
      this.props.createMap(this.refs.mapView)
    }
  }

  createFeatureLayer() {
    const pTemplate = {
        title: "Marriage in Zip Code: {ZIP}",
        content: "<p>As of 2015, <b>{MARRIEDRATE}%</b> of the population in this zip code is married.</p>" +
          "<li>The median age is {MED_AGE}</li>" +
          "<li>{RENTER_OCC} of {HOUSEHOLDS} households are renter occupied.</li></ul>",
        fieldInfos: [{
          fieldName: "MED_AGE",
          format: {
            digitSeparator: true,
            places: 0
          }
        }, {
          fieldName: "RENTER_OCC",
          format: {
            digitSeparator: true,
            places: 0
          }
        }, {
          fieldName: "HOUSEHOLDS",
          format: {
            digitSeparator: true,
            places: 0
          }
        }]
      };

    const featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0",
          outFields: ["*"],
          popupTemplate: pTemplate
        });


    function incrementCounter() {
      console.log('incrementing counter')
    }
    let mapView = this.props.mapCtrl;
    
    if (mapView) {
      mapView.on("click", function(event) {
        mapView.hitTest(event.screenPoint)
          .then(function(response) {
            if (response.results.length > 0) {
              incrementCounter()
            }
          })
      })
      mapView.map.layers.add(featureLayer);
    }
  }

  render() {
    const {clickCount} = this.state
    return (
      <div className="App">
        <p className="App-intro">
          Living in New York City 
        </p>
        <div ref='mapView' className='map-view'>
          {this.createFeatureLayer()}
        </div>
        <Counter clickCount={clickCount}/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
