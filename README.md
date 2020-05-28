# OPAL Web User Interface

This component provides the main user interface.
It mainly builds on [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) - a JavaScript library and a framework for building user interfaces.

The OPAL Web User Interface is used in the [OPAL demo component](https://github.com/projekt-opal/demo).


## Integrated: City App Demonstrator 

For OPAL deliverable D7.3, a mobile app was integrated to the OPAL user interface. It supports users in identifying data at their current locations.

The demonstrator was implemented by a web-app using Responsive web design (RWD).
The required user geo information is requested via the `navigator.geolocation.getCurrentPosition` function specified by W3C [GeoApi, Position].
The functionality was added using an integrated table sorting [OrderBy].

* [GeoApi] [W3C Geolocation API Specification](https://w3c.github.io/geolocation-api/)
* [Position] [OrderBy.js:96](src/components/report/datasets/dataset/OrderBy.js#L96)
* [OrderBy] [OrderBy.js:79](src/components/report/datasets/dataset/OrderBy.js#L79)

![Location selection](doc/location.png)

## Development

The *OPAL web-ui* requires a running *[OPAL webservice](https://github.com/projekt-opal/web-service)*, which provides the data to display.
You have to configure the webservice first.
If you are not running the webservice on your machine (localhost), specify the location by editing the file [webservice/axios-dataSets.js](webservice/axios-dataSets.js) and replace the baseURL of the webservice.

Afterwards you can use Node.js and npm commands to install packages, build and start the web-ui component. The required commands can be found in the [Dockerfile](Dockerfile). Available scripts are listed inside [package.json](package.json).
For instance, use these commands to run the web-ui:

```
npm install
npm run build
npm run dev
```

## Credits

[Data Science Group (DICE)](https://dice-research.org/) at [Paderborn University](https://www.uni-paderborn.de/)

This work has been supported by the German Federal Ministry of Transport and Digital Infrastructure (BMVI) in the project [Open Data Portal Germany (OPAL)](http://projekt-opal.de/) (funding code 19F2028A).
  