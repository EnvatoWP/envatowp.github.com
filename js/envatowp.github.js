/**
 * Functions to retrieve and display GitHub information on the EnvatoWP GitHub page.
 *
 * @author Japh <japh@envato.com>
 * @version 1.0
 */
$(function() {

	$body = $('body');

	if ( $body.hasClass( 'home' ) )
	{
		GitHubAPI.Activity( 'EnvatoWP', function ( json, status ) {
			console.log( json );
			if ( json.length > 0 )
			{
				var activity_count = 1;
				var content = '';
				$.each(json, function (i) {
					eventCreated = this['created_at'];
					eventActor = this['actor']['login'];
					eventActorUrl = 'https://github.com/' + this['actor']['login'];
					eventType = this['type'];
					eventRepo = this['repo']['name'];
					eventRepoUrl = this['repo']['url']
					content += '<li id="activity-' + activity_count + '">';
					activity_count++;
					content += '<a href="' + eventActorUrl + '" rel="external nofollow">' + eventActor + '</a>';
					switch ( eventType )
					{
						case 'GollumEvent':
							gollumAction = this['payload']['pages'][0]['action'];
							gollumPage = this['payload']['pages'][0]['page_name'];
							gollumPageUrl = this['payload']['pages'][0]['html_url'];
							content += ' ' + gollumAction + ' the page <a href="' + gollumPageUrl + '">' + gollumPage + '</a> ';
							content += ' in the ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a> wiki';
							break;

						case 'GistEvent':
							content += ' ' + this['payload']['action'] + 'd <a href="' + this['payload']['gist']['html_url'] + '">gist: ' + this['payload']['gist']['id'] + ' </a>';
							break;

						case 'FollowEvent':
							content += ' started following ';
							eventTarget = this['payload']['target']['login'];
							eventTargetUrl = this['payload']['target']['html_url'];
							content += '<a href="' + eventTargetUrl + '">' + eventTarget + '</a>';
							break;

						case 'ForkEvent':
							content += ' forked ';
							eventTarget = this['payload']['forkee']['name'];
							eventTargetUrl = this['payload']['forkee']['html_url'];
							content += '<a href="' + eventTargetUrl + '">' + eventTarget + '</a>';
							break;

						case 'WatchEvent':
							content += ' started watching ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'CreateEvent':
							content += ' created ' + this['payload']['ref_type'];
							if ( this['payload']['ref'] !== null )
							{
								content += ' ' + this['payload']['ref'];
							}
							content += ' at ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'DeleteEvent':
							content += ' deleted ' + this['payload']['ref_type'];
							if ( this['payload']['ref'] !== null )
							{
								content += ' ' + this['payload']['ref'];
							}
							content += ' at ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'PushEvent':
							var eventRef = this['payload']['ref'].split('/');
							content += ' pushed to ' + eventRef[eventRef.length - 1] + ' at ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'PublicEvent':
							content += ' open sourced ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'IssuesEvent':
							content += ' ' + this['payload']['action'] + ' <a href="' + this['payload']['issue']['html_url'] + '">issue ' + this['payload']['issue']['number'] + '</a> on ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'IssueCommentEvent':
							content += ' commented on <a href="' + this['payload']['issue']['html_url'] + '">issue ' + this['payload']['issue']['number'] + '</a> on ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'CommitCommentEvent':
							content += ' commented on <a href="' + this['payload']['comment']['html_url'] + '">commit ' + this['payload']['comment']['id'] + '</a> on ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'PullRequestEvent':
							content += ' ' + this['payload']['action'] + ' <a href="' + this['payload']['pull_request']['html_url'] + '">pull request ' + this['payload']['number'] + '</a> on ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
							break;

						case 'MemberEvent':
							content += ' ' + this['payload']['action'] + ' <a href="https://github.com/' + this['payload']['member']['login'] + '">' + this['payload']['member']['login'] + '</a> to ';
							content += '<a href="' + eventRepoUrl + '">' + eventRepo + '</a>';
					}
					var eventTime = new Date( eventCreated );
					content += ' <time datetime="' + eventCreated + '" title="' + eventTime.toLocaleString() + '">' + time_ago( eventTime.getTime() / 1000 ) + '</time>';
					content += '</li>';
				});
				content += '';
				$('.activity').fadeOut('slow', function () {
					$(this).html( content ).fadeIn('slow');
				});
			}
			else
			{
				emptyResponse();
			}
		} );
	}

	if ( $body.hasClass( 'own' ) )
	{
		GitHubAPI.Repos( 'EnvatoWP', function ( json, status ) {
			if ( json.length > 0 )
			{
				var content = '<ul id="own-list" style="display: none;">';
				$.each(json, function (i) {
					repoName = this['name'];
					repoDescription = this['description'];
					repoUrl = this['html_url'];
					repoOwner = this['owner']['login'];
					repoOwnerUrl = 'https://github.com/' + this['owner']['login'];
					content += '<li>';
					content += '<h3><a href="' + repoUrl + '" rel="external nofollow">' + repoName + '</a></h3>';
					content += '<p>by <a href="' + repoOwnerUrl + '">' + repoOwner + '</a></p>';
					if ( repoDescription !== '' )
					{
						content += '<p>' + repoDescription + '</p>';
					}
					content += '</li>';
				});
				content += '</ul>';
				$('#content').html( content );
				$('#own-list').slideDown('slow');
			}
			else
			{
				emptyResponse();
			}
		} );
	}

	if ( $body.hasClass( 'watched' ) )
	{
		GitHubAPI.Watched( 'EnvatoWP', function ( json, status ) {
			if ( json.length > 0 )
			{
				var content = '<ul id="watched-list" style="display: none;">';
				$.each(json, function (i) {
					repoName = this['name'];
					repoDescription = this['description'];
					repoUrl = this['html_url'];
					repoOwner = this['owner']['login'];
					repoOwnerUrl = 'https://github.com/' + this['owner']['login'];
					content += '<li>';
					content += '<h3><a href="' + repoUrl + '" rel="external nofollow">' + repoName + '</a></h3>';
					content += '<p>by <a href="' + repoOwnerUrl + '">' + repoOwner + '</a></p>';
					if ( repoDescription !== '' )
					{
						content += '<p>' + repoDescription + '</p>';
					}
					content += '</li>';
				});
				content += '</ul>';
				$('#content').html( content );
				$('#watched-list').slideDown('slow');
			}
			else
			{
				emptyResponse();
			}
		} );
	}

});

function emptyResponse()
{
	$('#content .loader').fadeOut('slow', function() {
		$('#content').html( '<p style="display: none;">Oops! Sorry, there\s nothing to display here just yet, but there will be soon as we do more on GitHub.' );
		$('#content p').fadeIn('slow');
	});
}

function time_ago(time)
{
	periods = new Array("second", "minute", "hour", "day", "week", "month", "year", "decade");
	lengths = new Array("60","60","24","7","4.35","12","10");

	nowdate = new Date();
	now = (nowdate.getTime() / 1000);

	difference = now - time;
	tense = "ago";

	for(j = 0; difference >= lengths[j] && j < lengths.length-1; j++) {
		difference /= lengths[j];
	}

	difference = Math.round(difference);

	if(difference != 1) {
		periods[j] += "s";
	}

	return difference + ' ' + periods[j] + ' ago';
}

