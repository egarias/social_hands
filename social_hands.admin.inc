<?php
function social_hands_init_form(){
	$form['cliente'] = array(
		 '#type' 			=> 'textfield',
		 '#title' 			=> t('Social Hands Client Code'),
		 '#default_value' 	=> variable_get('social_hands_client', ''),
		 '#description' 	=> t('Client Code provided by Social Hands Server'),
		 '#required' 		=> TRUE,
	);
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit'),
		 );
	return $form;
}
function social_hands_init_form_validate($form, &$form_state) {
//	if (!is_numeric($_POST['cliente'])) {
//		form_set_error('', t('Code must be numeric'));
//	}
}
function social_hands_init_form_submit($form, &$form_state) {
	variable_set('social_hands_client', $form_state['values']['cliente']);
	drupal_set_message(t('Your code has been submitted.'));
}