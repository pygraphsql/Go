// var map;
function initMap() {
  console.log('init');
  var originalMapCenter = new google.maps.LatLng(-25.363882, 131.044922);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: originalMapCenter
  });

  var marker = new google.maps.Marker({
    position: originalMapCenter,
    map: map
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'Change the zoom level'
  });
  // marker.infowindow = infowindow;
  //infowindow.open(map, marker);

  marker.addListener('mouseover', function() {
    console.log('marker mouse over');
    var div = document.createElement('div');
    div.innerHTML = 'hello';
    div.id = 'test';
    div.style = "backgroundcolor: red; border: 1px solid red; height:100%; width:100%"
    google.maps.event.addDomListener(div, 'mouseover', function() {
      console.log('success open');
      infowindow.open(marker.get('map'), marker);
    });
    google.maps.event.addDomListener(div, 'mouseout', function() {
      console.log('success close');
      infowindow.close();
    });
    infowindow.setContent(div);
    infowindow.open(marker.get('map'), marker);
  });

  marker.addListener('mouseout', function() {
    console.log('marker mouse out');
    infowindow.close();
  });

}


$(document).ready(function(){
  console.log('start');
});
