import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import graphql from '@kocal/rollup-plugin-graphql';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const reactExports = ['useDebugValue', 'useRef', 'useEffect', 'useLayoutEffect', 'lazy', 'Suspsense', 'memo', 'useMemo', 'useCallback', 'useState', 'useContext', 'forwardRef', 'createContext', 'Component', 'PureComponent', 'Fragment', 'Children', 'createElement', 'cloneElement']

export default {
	input: 'src/index.tsx',
	output: {
		dir: 'lib',
		format: 'esm',
		sourcemap: false,
	},
	plugins: [
    graphql(),
    resolve({
      extensions,
      mainFields: ['module', 'jsnext', 'jsnext:main', 'main', 'browser'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/leaflet/dist/leaflet-src.js': ['VideoOverlay', 'Tooltip', 'TileLayer', 'Rectangle', 'Popup', 'Polyline', 'Polygon', 'Marker', 'Map', 'LayerGroup', 'latLngBounds', 'ImageOverlay', 'GridLayer', 'GeoJSON', 'FeatureGroup', 'DomUtil', 'CircleMarker', 'Circle', 'Control'],
        'node_modules/styled-components/dist/styled-components.browser.esm.js': reactExports,
        'node_modules/react-is/index.js': ['isElement', 'ForwardRef', 'isValidElementType'],
        'node_modules/react-apollo/node_modules/prop-types/index.js': ['object', 'func', 'node', 'string', 'bool', 'number', 'oneOfType', 'arrayOf', 'any'],
        'node_modules/react/index.js': reactExports,
        'node_modules/react-dom/index.js': ['createPortal', 'render'],
      }
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      runtimeHelpers: true,
    }),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
		terser({
      sourcemap: true,
      output: { comments: false },
      compress: Object.assign(
        {
          keep_infinity: true,
          pure_getters: true,
          passes: 10,
        },
      ),
      warnings: true,
      ecma: 5,
    }),
    filesize(),
	]
};
