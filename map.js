var map;
// var infowindow;
function initMap() {
  console.log('init');
  var originalMapCenter = new google.maps.LatLng(-25.363882, 131.044922);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: originalMapCenter
  });

  var openedMarked = null;
  var areaHeightTop = 100, areaHeightBottom = 12, areaWidth = 100;

  map.addListener('mousemove', function(event) {
    if (openedMarked == null) return;
    if (event.pixel.x < openedMarked.px.x - areaWidth ||
        event.pixel.x > openedMarked.px.x + areaWidth ||
        event.pixel.y < openedMarked.px.y - areaHeightTop ||
        event.pixel.y > openedMarked.px.y + areaHeightBottom) {
      console.log('out of bound');
      // console.log(event.pixel.x);
      // console.log(event.pixel.y);
      console.log(openedMarked.infowindow);
      openedMarked.infowindow.close();
      openedMarked = null;
    }
  });

  map.addListener('click', function(event) {
    console.log(event.pixel);
  });

  function addMarker(position) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });

    console.log(marker);
    //infowindow.open(map, marker);
    var infowindow = new google.maps.InfoWindow({
      content: 'Change the zoom levelChange the zoom levelChange the zoom levelChange the zoom levelChange the zoom levelChange the zoom levelChange the zoom levelChange the zoom levelChange the zoom level'
    });

    marker.addListener('mouseover', function() {
      console.log('marker mouse over');
      marker.infowindow = infowindow;
      if (openedMarked != null) {
        return;
      }
      infowindow.open(marker.get('map'), marker);
      var scale = Math.pow(2, map.getZoom());
      var nw = new google.maps.LatLng(
          map.getBounds().getNorthEast().lat(),
          map.getBounds().getSouthWest().lng()
      );
      var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
      var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
      var pixelOffset = new google.maps.Point(
          Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
          Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
      );
      marker.px = pixelOffset;
      openedMarked = marker;
    });
  }
  addMarker(new google.maps.LatLng(-30, 150));
  addMarker(new google.maps.LatLng(-32, 150));
}
