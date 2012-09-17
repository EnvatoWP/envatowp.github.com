/**
 * Simple jQuery API wrapper for GitHub
 *
 * @author Japh <japh@envato.com>
 * @version 1.0
 */
function GitHubAPI(){}

/**
 * Call to user repo list end-point of GitHub API
 *
 * @author Japh <japh@envato.com>
 * @since 1.0
 */
GitHubAPI.Repos = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/repos?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		callback( json.data, status );
	} );
}

/**
 * Call to user watch list end-point of GitHub API
 *
 * @author Japh <japh@envato.com>
 * @since 1.0
 */
GitHubAPI.Watched = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/watched?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		callback( json.data, status );
	} );
}

/**
 * Call to user activity stream end-point of GitHub API
 *
 * @author Japh <japh@envato.com>
 * @since 1.0
 */
GitHubAPI.Activity = function ( username, callback ) {
	requestURL = 'https://api.github.com/users/' + username + '/events/public?callback=?';
	$.getJSON( requestURL, function( json, status ) {
		console.log( json );
		callback( json.data, status );
	} );
}

