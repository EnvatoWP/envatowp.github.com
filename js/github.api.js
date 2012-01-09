function GitHubAPI(){}

GitHubAPI.Repos = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/repos?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		callback( json.data, status );
	} );
}

GitHubAPI.Watched = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/watched?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		callback( json.data, status );
	} );
}

GitHubAPI.Activity = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/events/public?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		console.log( json );
		callback( json.data, status );
	} );
}

