// Unobtrusive RESTful dynamic/dependent select menus for Ruby on Rails 3 and jQuery
//
// USAGE (with Formtastic):
//
// match   = form.object
// seasons = Season.all
// rounds  = match.season.nil? ? Array.new : match.season.rounds
//
// form.input :season, :as => :select, :collection => seasons, :include_blank => false, :prompt => true, :input_html => { :id => :season_id }
// form.input :round,  :as => :select, :collection => rounds,  :include_blank => false, :prompt => true, :input_html => { :id => :round_id,
//   "data-option-dependent"    => true,
//   "data-option-observed"     => "season_id",
//   "data-option-url"          => "/seasons/:season_id:/rounds.json",
//   "data-option-key-method"   => :id,
//   "data-option-value-method" => :name
// }
// 
// JSON response example:
// [{"end_date":"2011-10-29","name":"First","start_date":"2011-10-01","state":"opened"},
// {"end_date":"2011-09-30","name":"Second","start_date":"2011-09-03","state":"opened"}]

jQuery(document).ready(function() {
	$('select[data-option-dependent=true]').each(function (i) {

		var observer_dom_id = $(this).attr('id');
		var observed_dom_id = $(this).data('option-observed');
		var url_mask        = $(this).data('option-url');
		var key_method      = "id"; //$(this).data('option-key-method');
		var value_method    = "name"; //$(this).data('option-value-method');
		var prompt          = $(this).has('option[value=]').size() ? $(this).find('option[value=]') : $('<option>').text('?');
		var regexp          = /:[0-9a-zA-Z_]+/g;

		var observer = $('select#'+ observer_dom_id);
		var observed = $('select#'+ observed_dom_id);
		
		if (!observer.val() && observed.size() > 1) {
			observer.attr('disabled', true);
		}
		observed.on('change', function() {
			url = url_mask.replace(regexp, function(submask) {
				dom_id = submask.substring(1, submask.length);
				return $("select#"+ dom_id).val();
			});
			
			observer.empty().append(prompt);
			
			$.getJSON(url, function(data) {
				$.each(data, function(i, object) {
					observer.append($('<option>').attr('value', object[key_method]).text(object[value_method]));
					observer.attr('disabled', false);
				});
				
			});
		});
	});
});
