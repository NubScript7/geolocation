if( 'geolocation' in navigator ){

	navigator.geolocation.getCurrentPosition( pos => {

		const lat = pos.coords.latitude;
		const lon = pos.coords.longitude;

		$('#lon').val('longitude: '+lon);
		$('#lat').val('latitude: '+lat);

	},(x) => alert('permission denied or location is turned off'))

} else {
	alert('geolocation not available.')
}