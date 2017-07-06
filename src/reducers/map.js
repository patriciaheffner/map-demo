import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';

const map = (state = { }, action) => {

  switch (action.type) {
    case 'CREATE_MAP':

      return {
        mapCtrl: new MapView({
          container: action.domNode,
          map: new EsriMap({basemap: 'topo', layers: []}),
          center: [-73.950, 40.702],
          zoom: 11
        })
      }

    default:
      return state
  }
}

export default map;