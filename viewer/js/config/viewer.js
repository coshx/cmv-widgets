define([
  'esri/units',
  'esri/geometry/Extent',
  'esri/config',
  'esri/tasks/GeometryService',
  'esri/layers/ImageParameters',
  'esri/urlUtils'
], function (units, Extent, esriConfig, GeometryService, ImageParameters, urlUtils) {
  // set proxy configuration rules
  urlUtils.addProxyRule({
    urlPrefix: 'http://sampleserver3.arcgisonline.com',
    proxyUrl: 'http://localhost:3002/proxy'
  });

  // url to your geometry server.
  esriConfig.defaults.geometryService = new GeometryService('http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

  //image parameters for dynamic services, set to png32 for higher quality exports.
  var imageParameters = new ImageParameters();
  imageParameters.format = 'png32';

  return {
    // used for debugging your app
    isDebug: true,

    //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
    defaultMapClickMode: 'identify',
    // map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
    mapOptions: {
      basemap: 'streets',
      center: [-103, 40],
      zoom: 3,
      sliderStyle: 'small'
    },
    // panes: {
    // 	left: {
    // 		splitter: true
    // 	},
    // 	right: {
    // 		id: 'sidebarRight',
    // 		placeAt: 'outer',
    // 		region: 'right',
    // 		splitter: true,
    // 		collapsible: true
    // 	},
    // 	bottom: {
    // 		id: 'sidebarBottom',
    // 		placeAt: 'outer',
    // 		splitter: true,
    // 		collapsible: true,
    // 		region: 'bottom'
    // 	},
    // 	top: {
    // 		id: 'sidebarTop',
    // 		placeAt: 'outer',
    // 		collapsible: true,
    // 		splitter: true,
    // 		region: 'top'
    // 	}
    // },
    // collapseButtonsPane: 'center', //center or outer

    // operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
    // The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
    // 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
    operationalLayers: [
      {
      type: 'dynamic',
      url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer/',
      title: 'Hurricane Tracks 1851-2007',
      options: {
        id: 'hurricaneTracks',
        opacity: 1.0,
        visible: true,
        outFields: ['BTID', 'NAME', 'LAT', 'LONG', 'WIND_KTS', 'CAT', 'PRESSURE'],
        mode: 0
      }},
      {
      type: 'dynamic',
      url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer/',
      title: 'Bloomfield, Michigan Parcels',
      options: {
        id: 'bloomfieldParcels',
        opacity: 1.0,
        visible: true,
        outFields: ['NGHBRHDCD', 'PARCELID', 'LOWPARCELID'],
        mode: 0
      }
    }],
    // set include:true to load. For titlePane type set position the the desired order in the sidebar
    widgets: {
      growler: {
        include: true,
        id: 'growler',
        type: 'domNode',
        path: 'gis/dijit/Growler',
        srcNodeRef: 'growlerDijit',
        options: {}
      },
      geocoder: {
        include: true,
        id: 'geocoder',
        type: 'domNode',
        path: 'gis/dijit/Geocoder',
        srcNodeRef: 'geocodeDijit',
        options: {
          map: true,
          mapRightClickMenu: true,
          geocoderOptions: {
            autoComplete: true,
            arcgisGeocoder: {
              placeholder: 'Enter an address or place'
            }
          }
        }
      },
      identify: {
        include: true,
        id: 'identify',
        type: 'titlePane',
        path: 'gis/dijit/Identify',
        title: 'Identify',
        open: false,
        position: 3,
        options: 'config/identify'
      },
      basemaps: {
        include: true,
        id: 'basemaps',
        type: 'domNode',
        path: 'gis/dijit/Basemaps',
        srcNodeRef: 'basemapsDijit',
        options: 'config/basemaps'
      },
      mapInfo: {
        include: false,
        id: 'mapInfo',
        type: 'domNode',
        path: 'gis/dijit/MapInfo',
        srcNodeRef: 'mapInfoDijit',
        options: {
          map: true,
          mode: 'dms',
          firstCoord: 'y',
          unitScale: 3,
          showScale: true,
          xLabel: '',
          yLabel: '',
          minWidth: 286
        }
      },
      scalebar: {
        include: true,
        id: 'scalebar',
        type: 'map',
        path: 'esri/dijit/Scalebar',
        options: {
          map: true,
          attachTo: 'bottom-left',
          scalebarStyle: 'line',
          scalebarUnit: 'dual'
        }
      },
      locateButton: {
        include: true,
        id: 'locateButton',
        type: 'domNode',
        path: 'gis/dijit/LocateButton',
        srcNodeRef: 'locateButton',
        options: {
          map: true,
          publishGPSPosition: true,
          highlightLocation: true,
          useTracking: true,
          geolocationOptions: {
            maximumAge: 0,
            timeout: 15000,
            enableHighAccuracy: true
          }
        }
      },
      overviewMap: {
        include: true,
        id: 'overviewMap',
        type: 'map',
        path: 'esri/dijit/OverviewMap',
        options: {
          map: true,
          attachTo: 'bottom-right',
          color: '#0000CC',
          height: 100,
          width: 125,
          opacity: 0.30,
          visible: false
        }
      },
      homeButton: {
        include: true,
        id: 'homeButton',
        type: 'domNode',
        path: 'esri/dijit/HomeButton',
        srcNodeRef: 'homeButton',
        options: {
          map: true,
          extent: new Extent({
            xmin: -180,
            ymin: -85,
            xmax: 180,
            ymax: 85,
            spatialReference: {
              wkid: 4326
            }
          })
        }
      },
      legend: {
        include: true,
        id: 'legend',
        type: 'titlePane',
        path: 'esri/dijit/Legend',
        title: 'Legend',
        open: false,
        position: 0,
        options: {
          map: true,
          legendLayerInfos: true
        }
      },
      layerControl: {
        include: true,
        id: 'layerControl',
        type: 'titlePane',
        path: 'gis/dijit/LayerControl',
        title: 'Layers',
        open: false,
        position: 0,
        options: {
          map: true,
          layerControlLayerInfos: true,
          separated: true,
          vectorReorder: true,
          overlayReorder: true
        }
      },
      bookmarks: {
        include: true,
        id: 'bookmarks',
        type: 'titlePane',
        path: 'gis/dijit/Bookmarks',
        title: 'Bookmarks',
        open: false,
        position: 2,
        options: 'config/bookmarks'
      },
      find: {
        include: true,
        id: 'find',
        type: 'titlePane',
        canFloat: true,
        path: 'gis/dijit/Find',
        title: 'Find',
        open: false,
        position: 3,
        options: 'config/find'
      },
      draw: {
        include: true,
        id: 'draw',
        type: 'titlePane',
        canFloat: true,
        path: 'gis/dijit/Draw',
        title: 'Draw',
        open: false,
        position: 4,
        options: {
          map: true,
          mapClickMode: true
        }
      },
      measure: {
        include: true,
        id: 'measurement',
        type: 'titlePane',
        canFloat: true,
        path: 'gis/dijit/Measurement',
        title: 'Measurement',
        open: false,
        position: 5,
        options: {
          map: true,
          mapClickMode: true,
          defaultAreaUnit: units.SQUARE_MILES,
          defaultLengthUnit: units.MILES
        }
      },
      print: {
        include: true,
        id: 'print',
        type: 'titlePane',
        canFloat: true,
        path: 'gis/dijit/Print',
        title: 'Print',
        open: false,
        position: 6,
        options: {
          map: true,
          printTaskURL: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
          copyrightText: 'Copyright 2014',
          authorText: 'Me',
          defaultTitle: 'Viewer Map',
          defaultFormat: 'PDF',
          defaultLayout: 'Letter ANSI A Landscape'
        }
      },
      directions: {
        include: true,
        id: 'directions',
        type: 'titlePane',
        path: 'gis/dijit/Directions',
        title: 'Directions',
        open: false,
        position: 7,
        options: {
          map: true,
          mapRightClickMenu: true,
          options: {
            routeTaskUrl: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route',
            routeParams: {
              directionsLanguage: 'en-US',
              directionsLengthUnits: units.MILES
            },
            active: false //for 3.12, starts active by default, which we dont want as it interfears with mapClickMode
          }
        }
      },
      editor: {
        include: true,
        id: 'editor',
        type: 'titlePane',
        path: 'gis/dijit/Editor',
        title: 'Editor',
        open: false,
        position: 8,
        options: {
          map: true,
          mapClickMode: true,
          editorLayerInfos: true,
          settings: {
            toolbarVisible: true,
            showAttributesOnClick: true,
            enableUndoRedo: true,
            createOptions: {
              polygonDrawTools: ['freehandpolygon', 'autocomplete']
            },
            toolbarOptions: {
              reshapeVisible: true,
              cutVisible: true,
              mergeVisible: true
            }
          }
        }
      },
      streetview: {
        include: true,
        id: 'streetview',
        type: 'titlePane',
        canFloat: true,
        position: 9,
        path: 'gis/dijit/StreetView',
        title: 'Google Street View',
        options: {
          map: true,
          mapClickMode: true,
          mapRightClickMenu: true
        }
      },
      findById: {
        include: true,
        id: 'findById',
        type: 'titlePane',
        canFloat: true,
        path: 'gis/dijit/FindById',
        title: 'Find by ID',
        open: false,
        position: 10,
        options: 'config/findById'
      },
      help: {
        include: true,
        id: 'help',
        type: 'floating',
        path: 'gis/dijit/Help',
        title: 'Help',
        options: {}
      }

    }
  };
});
