function autoFillCityState(){
	var Model = arguments[0];
		// only do the lookup if something's in the zip and country fields
		if ($('#' + Model + 'Zip').val() && ($('#' + Model + 'Country :selected').val())) {
			
			
			if($('#' + Model + 'Country').val() != 'US'){
				stateField = '#' + Model + 'OtherState';
			}
			else{
				stateField = '#' + Model + 'State';
			}
			

			$("#" + Model + "City, " + stateField).addClass('form_field_ajax_spinner');
			
			$.getJSON(
					zipURL
					.replace("__zip_code__", $("#" + Model + "Zip").val())
					.replace("__country__", $("#" + Model + "Country").val()),
				function(response) {
					if (response.city) {
						$("#" + Model + "City").val(response.city);
						$(stateField).val(response.state).attr("selected", "selected");
					}
					
					$("#" + Model + "City, " + stateField).removeClass('form_field_ajax_spinner');
				}
			)
		}
	}	

function autoFillBilling(){
		// only do the lookup if something's in the zip and country fields
		if ($('#BillingInfoPostalCode').val() && ($('#BillingInfoCountry :selected').val())) {
			
			
			if($('#BillingInfoCountry').val() != 'US'){
				stateField = '#BillingInfoOtherState';
			}
			else{
				stateField = '#BillingInfoStateProvidence';
			}
			

			$("#BillingInfoCity, " + stateField).addClass('form_field_ajax_spinner');
			
			$.getJSON(
					zipURL
					.replace("__zip_code__", $("#BillingInfoPostalCode").val())
					.replace("__country__", $("#BillingInfoCountry").val()),
				function(response) {
					if (response.city) {
						$("#BillingInfoCity").val(response.city);
						$(stateField).val(response.state).attr("selected", "selected");
					}
					
					$("#BillingInfoCity, " + stateField).removeClass('form_field_ajax_spinner');
				}
			)
		}
	}	

