## City App Demonstrator 

For OPAL deliverable D7.3, a mobile app was integrated to the OPAL frontend. It supports users in identifying data at their current locations.

The demonstrater was implemented by a web-app using Responsive web design (RWD).
The required user geo information is requested via the `navigator.geolocation.getCurrentPosition` function specified by W3C [GeoApi].
The functionality was added using an integrated table sorting [OrderBy].

* [GeoApi][W3C Geolocation API Specification](https://w3c.github.io/geolocation-api/)
* [OrderBy] JavaScript file [OrderBy.js](../components/report/datasets/dataset/OrderBy.js#L96)