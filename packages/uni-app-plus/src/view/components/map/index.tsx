import { defineBuiltInComponent } from '@dcloudio/uni-components'
import DefaultMap from './map'
import QQMap from './map-web'

const props = {
  id: {
    type: String,
    default: '',
  },
  latitude: {
    type: [Number, String],
    default: '',
  },
  longitude: {
    type: [Number, String],
    default: '',
  },
  scale: {
    type: [String, Number],
    default: 16,
  },
  markers: {
    type: Array,
    default() {
      return []
    },
  },
  polyline: {
    type: Array,
    default() {
      return []
    },
  },
  circles: {
    type: Array,
    default() {
      return []
    },
  },
  polygons: {
    type: Array,
    default() {
      return []
    },
  },
  controls: {
    type: Array,
    default() {
      return []
    },
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props,
  components: {
    DefaultMap,
    QQMap,
  },
  emits: ['click', 'regionchange', 'controltap', 'markertap', 'callouttap'],
  setup(props, { emit }) {
    function onClick(event) {
      emit('click', event)
    }
    function onRegionchange(event) {
      emit('regionchange', event)
    }
    function onControltap(event) {
      emit('controltap', event)
    }
    function onMarkertap(event) {
      emit('markertap', event)
    }
    function onCallouttap(event) {
      emit('callouttap', event)
    }

    return () => {
      if (__uniConfig.qqMapKey) {
        return (
          <QQMap
            id={props.id}
            latitude={props.latitude}
            longitude={props.longitude}
            scale={props.scale}
            markers={props.markers}
            polyline={props.polyline}
            circles={props.circles}
            polygons={props.polygons}
            controls={props.controls}
            onClick={onClick}
            onRegionchange={onRegionchange}
            onControltap={onControltap}
            onMarkertap={onMarkertap}
            onCallouttap={onCallouttap}
          ></QQMap>
        )
      } else {
        return (
          <DefaultMap
            id={props.id}
            latitude={props.latitude}
            longitude={props.longitude}
            scale={props.scale}
            markers={props.markers}
            polyline={props.polyline}
            circles={props.circles}
            polygons={props.polygons}
            controls={props.controls}
            onClick={onClick}
            onRegionchange={onRegionchange}
            onControltap={onControltap}
            onMarkertap={onMarkertap}
            onCallouttap={onCallouttap}
          ></DefaultMap>
        )
      }
    }
  },
})
