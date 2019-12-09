## City App Demonstrator 

For OPAL deliverable D7.3, a mobile app was integrated to the OPAL frontend. It supports users in identifying data at their current locations.

The demonstrator was implemented by a web-app using Responsive web design (RWD).
The required user geo information is requested via the `navigator.geolocation.getCurrentPosition` function specified by W3C [GeoApi, Position].
The functionality was added using an integrated table sorting [OrderBy].

* [GeoApi] [W3C Geolocation API Specification](https://w3c.github.io/geolocation-api/)
* [Position] [OrderBy.js:96](../components/report/datasets/dataset/OrderBy.js#L96)
* [OrderBy] [OrderBy.js:79](../components/report/datasets/dataset/OrderBy.js#L79)